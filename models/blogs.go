package models

import "gorm.io/gorm"

type Blogs struct {
	ID       int     `json:"id"`
	Username *string `json:"username"`
	Title    *string `json:"title"`
	Content  *string `json:"content"`
	Created  *string `json:"created"`
}

func MigrateBlogs(db *gorm.DB) error {
	err := db.AutoMigrate(&Blogs{})
	return err
}
