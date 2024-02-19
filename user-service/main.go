// user-service/main.go

package userservice

import (
	"log"

	"blog/contracttesting/db"

	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize the database connection
	db.InitDB()
	defer db.CloseDB()

	db.CreateUsersTable()
	db.CreateBlogPostsTable()
	db.CreateCommentsTable()
	// Create a new Gin router
	r := gin.Default()

	// Define routes
	r.GET("/users/:id", getUserByIDHandler)
	r.GET("/users/:id/blogs", getUserBlogPostsHandler)
	r.GET("/users/:id/comments", getUserCommentsHandler)

	// Run the server
	if err := r.Run(":8081"); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
