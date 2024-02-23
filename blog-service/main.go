package main

import (
	"blog/contracttesting/db"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db.InitDB()
	defer db.CloseDB()

	db.CreateUsersTable()
	db.CreateBlogPostsTable()
	db.CreateCommentsTable()
	r := gin.Default()
	// Configure CORS middleware
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"} // Add your frontend origin here
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	r.Use(cors.New(config))
	// Define routes
	r.GET("/", healthCheckHandler)
	r.GET("/blogs/:blogID", getblogHandler)
	r.DELETE("/:id/blogs/:blogID", deleteblogHandler)
	r.POST("/blogs", createblogHandler)
	r.PUT("/blogs", updateblogHandler)
	// Run server
	r.Run(":8082")
}
