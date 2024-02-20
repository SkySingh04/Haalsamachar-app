package main

import (
	"blog/contracttesting/db"

	"github.com/gin-gonic/gin"
)

func main() {
	db.InitDB()
	defer db.CloseDB()

	db.CreateCommentsTable()
	db.CreateBlogPostsTable()
	db.CreateUsersTable()
	r := gin.Default()

	// Define routes
	r.GET("/", healthCheckHandler)
	r.POST("/comments", addCommentHandler)
	r.GET("/blogs/:blogID/comments", getCommentsHandler)
	r.PUT("/comments", updateCommentHandler)
	r.DELETE("/comments/:commentID", deleteCommentHandler)

	// Run server
	r.Run(":8083")
}
