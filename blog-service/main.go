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
	err := godotenv.Load()

	if err != nil {
		log.Println("Error loading .env file" + err.Error())
	}

	deploymentLink := os.Getenv("DEPLOYMENT_LINK")
	deploymentLink2 := deploymentLink + "/"
	
	r := gin.Default()
	// Configure CORS middleware
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{deploymentLink2, "http://localhost:3000/", deploymentLink, "http://localhost:3000"} // Add your frontend origin here
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	r.Use(cors.New(config))
	// Define routes
	r.GET("/", healthCheckHandler)
	r.GET("/blogs/:blogID", getblogHandler)
	r.DELETE("/blogs/:blogID", deleteblogHandler)
	r.POST("/blogs", createblogHandler)
	r.PUT("/blogs", updateblogHandler)
	// Run server
	if err := r.Run(":8082"); err != nil {
		panic(err)
	}
}
