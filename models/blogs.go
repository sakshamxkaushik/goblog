package models

import (
	"gorm.io/gorm"
)

type Blog struct {
	ID      uint   `json:"id" gorm:"primaryKey"`
	Title   string `json:"title" gorm:"not null;column:title;size:255"`
	Content string `json:"content"`
	Post    string `json:"post" gorm:"not null;column:post;size:255"`
	Image   string `json:"image" gorm:"null;column:image;size:255"`
}

type User struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	Username string `json:"username"`
}

type BlogAuthor struct {
	BlogID   uint `gorm:"primaryKey" json:"blog_id"`
	AuthorID uint `gorm:"primaryKey" json:"author_id"`
}

func MigrateBlogs(db *gorm.DB) error {
	err := db.AutoMigrate(&Blog{})
	return err
}
