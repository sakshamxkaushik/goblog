package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/sakshamxkaushik/goblog/models"
	"github.com/sakshamxkaushik/goblog/storage"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"gorm.io/gorm"
)

type Blog struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	AuthorID  uint      `json:"author_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type User struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	Username string `json:"username"`
}

type BlogAuthor struct {
	BlogID   uint `gorm:"primaryKey" json:"blog_id"`
	AuthorID uint `gorm:"primaryKey" json:"author_id"`
}

type Repository struct {
	DB *gorm.DB
}

func (r *Repository) CreateBlog(context *fiber.Ctx) error {
	blog := Blog{}

	err := context.BodyParser(&blog)

	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "request failed"})
		return err
	}

	err = r.DB.Create(&blog).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not create blog"})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "blog has been added"})
	return nil
}

func (r *Repository) DeleteBlog(context *fiber.Ctx) error {
	blogModel := models.Blog{}
	id := context.Params("id")
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}

	err := r.DB.Delete(blogModel, id)

	if err.Error != nil {
		context.Status(http.StatusBadRequest).JSON(&fiber.Map{
			"message": "could not delete blog",
		})
		return err.Error
	}
	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "blog delete successfully",
	})
	return nil
}

func (r *Repository) GetBlogs(context *fiber.Ctx) error {
	blogModels := &[]models.Blog{}

	err := r.DB.Find(blogModels).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get blogs"})
		return err
	}

	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "blogs fetched successfully",
		"data":    blogModels,
	})
	return nil
}

func (r *Repository) GetBlogByID(context *fiber.Ctx) error {

	id := context.Params("id")
	blogModel := &models.Blog{}
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(&fiber.Map{
			"message": "id cannot be empty",
		})
		return nil
	}

	fmt.Println("the ID is", id)

	err := r.DB.Where("id = ?", id).First(blogModel).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "could not get the blog"})
		return err
	}
	context.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "blog id fetched successfully",
		"data":    blogModel,
	})
	return nil
}

func (r *Repository) SetupRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Post("/create_blog", r.CreateBlog)
	api.Delete("delete_blog/:id", r.DeleteBlog)
	api.Get("/get_blog/:id", r.GetBlogByID)
	api.Get("/blog", r.GetBlogs)

	app.Get("/test", func(context *fiber.Ctx) error {
		return context.SendString("Hello, World!")
	})
}

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal(err)
	}
	config := &storage.Config{
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		Password: os.Getenv("DB_PASS"),
		User:     os.Getenv("DB_USER"),
		SSLMode:  os.Getenv("DB_SSLMODE"),
		DBName:   os.Getenv("DB_NAME"),
	}

	db, err := storage.NewConnection(config)

	if err != nil {
		log.Fatal("could not load the database")
	}
	err = models.MigrateBlogs(db)
	if err != nil {
		log.Fatal("could not migrate db")
	}

	r := Repository{
		DB: db,
	}
	app := fiber.New()
	r.SetupRoutes(app)
	app.Listen(":8080")
}
