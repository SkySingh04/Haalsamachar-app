package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Define routes
	r.POST("/api/articles/:articleID/comments", addCommentHandler)
	r.GET("/api/articles/:articleID/comments", getCommentsHandler)
	r.PUT("/api/comments/:commentID", updateCommentHandler)
	r.DELETE("/api/comments/:commentID", deleteCommentHandler)

	// Run server
	r.Run(":8083")
}

// Define handlers
func addCommentHandler(c *gin.Context) {
	// Implement add comment logic
}

func getCommentsHandler(c *gin.Context) {
	// Implement get comments logic
}

func updateCommentHandler(c *gin.Context) {
	// Implement update comment logic
}

func deleteCommentHandler(c *gin.Context) {
	// Implement delete comment logic
}
