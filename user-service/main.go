// user-service/main.go

package main

import (
	"log"
	"net/http"
	"strconv"

	"blog/contracttesting/db"

	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize the database connection
	db.InitDB()
	defer db.CloseDB()

	// Create a new Gin router
	r := gin.Default()

	// Define routes
	r.GET("/users/:id", getUserByIDHandler)
	r.GET("/users/:id/blogs", getUserBlogsHandler)

	// Run the server
	if err := r.Run(":8081"); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}

func getUserByIDHandler(c *gin.Context) {
	// Extract user ID from request parameters
	userIDStr := c.Param("id")
	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Perform database operation to get user by ID
	user, err := db.GetUserByID(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user"})
		return
	}

	// Return user data as JSON response
	c.JSON(http.StatusOK, user)
}

func getUserBlogsHandler(c *gin.Context) {
	// Extract user ID from request parameters
	userIDStr := c.Param("id")
	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	// Perform database operation to get blogs by user ID
	blogs, err := db.GetBlogPostsByUserID(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user blogs"})
		return
	}

	// Return blogs data as JSON response
	c.JSON(http.StatusOK, blogs)
}
