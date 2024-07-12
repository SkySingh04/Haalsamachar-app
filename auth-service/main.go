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
	db.InitDB()
	defer db.CloseDB()

	db.CreateUsersTable()
	db.CreateBlogPostsTable()
	db.CreateCommentsTable()
	db.CreateCategoriesTable()
	db.CreateCategoryAssignmentsTable()
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
	db.InitDB()
	defer db.CloseDB()

	db.CreateUsersTable()

	// Define routes

	r.GET("/", healthCheckHandler)
	r.POST("/api/auth/login", loginHandler)
	r.GET("/api/auth/verify", verifyHandler)
	r.POST("/api/auth/refresh", refreshTokenHandler)

	// Run server
	r.Run(":8084")
}
