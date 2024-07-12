package main

import (
	"blog/contracttesting/db"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Println("Error loading .env file" + err.Error())
	}

	deploymentLink := os.Getenv("DEPLOYMENT_LINK")
	deploymentLink2 := deploymentLink + "/"
	db.InitDB()
	defer db.CloseDB()

	db.CreateCommentsTable()
	db.CreateCategoriesTable()
	db.CreateCategoryAssignmentsTable()
	db.CreateBlogPostsTable()
	db.CreateUsersTable()
	r := gin.Default()
	// Configure CORS middleware
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{deploymentLink2, "http://localhost:3000/", deploymentLink, "http://localhost:3000"} // Add your frontend origin here
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
