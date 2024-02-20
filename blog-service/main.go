package main

import (
	"blog/contracttesting/db"

	"github.com/gin-gonic/gin"
)

func main() {
	db.InitDB()
	defer db.CloseDB()

	db.CreateUsersTable()
	db.CreateBlogPostsTable()
	db.CreateCommentsTable()
	r := gin.Default()

	// Define routes
	r.GET("/:id/blogs/:blogID", getblogHandler)
	r.DELETE("/:id/blogs/:blogID", deleteblogHandler)
	r.POST("/blogs", createblogHandler)
	r.PUT("/blogs", updateblogHandler)
	// Run server
	r.Run(":8082")
}
