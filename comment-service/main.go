package main

import (
	"blog/contracttesting/db"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db.InitDB()
	defer db.CloseDB()

	db.CreateCommentsTable()
	db.CreateBlogPostsTable()
	db.CreateUsersTable()
	r := gin.Default()
	// Configure CORS middleware
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"https://haal-samachar.vercel.app/", "http://localhost:3000/", "https://haal-samachar.vercel.app", "http://localhost:3000"} // Add your frontend origin here
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	r.Use(cors.New(config))

	// Define routes
	r.GET("/", healthCheckHandler)
	r.POST("/comments", addCommentHandler)
	r.GET("/blogs/:blogID/comments", getCommentsHandler)
	r.PUT("/comments", updateCommentHandler)
	r.DELETE("/comments/:commentID", deleteCommentHandler)

	// Run server
	r.Run(":8083")
}
