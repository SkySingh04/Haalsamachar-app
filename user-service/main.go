package main

import (
	"log"
	"os"

	"blog/contracttesting/db"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"github.com/gin-contrib/cors"
)

func main() {
	// Initialize the database connection
	db.InitDB()
	defer db.CloseDB()

	db.CreateUsersTable()
	db.CreateBlogPostsTable()
	db.CreateCommentsTable()
	db.CreateCategoriesTable()
	db.CreateCategoryAssignmentsTable()
	// Create a new Gin router
	r := gin.Default()
	
	err := godotenv.Load()

	if err != nil {
		log.Println("Error loading .env file" + err.Error())
	}
	
	deploymentLink := os.Getenv("DEPLOYMENT_LINK")
	deploymentLink2 := deploymentLink + "/"
	// Configure CORS middleware
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{deploymentLink2, "http://localhost:3000/", deploymentLink, "http://localhost:3000"} // Add your frontend origin here
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	r.Use(cors.New(config))

	// Define routes
	r.GET("/", healthCheckHandler)
	r.GET("/users/:id", getUserByIDHandler)
	r.GET("/users/email/:email", getUserByEmailHandler)
	r.GET("/users/username/:username", getUserByUsernameHandler)
	r.GET("/users/:id/blogs", getUserBlogPostsHandler)
	r.GET("/users/:id/comments", getUserCommentsHandler)
	r.GET("/blogs", getAllBlogPostsHandler)
	r.GET("/users", getAllUsersHandler)

	// Routes for creating a user
	r.POST("/users", SignupHandler)

	// Run the server
	if err := r.Run(":8081"); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
