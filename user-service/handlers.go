package main

import (
	"blog/contracttesting/db"
	"blog/contracttesting/models"
	"blog/contracttesting/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func healthCheckHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "User service is healthy"})
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

func getUserByEmailHandler(c *gin.Context) {
	// Extract email from request parameters
	email := c.Param("email")

	// Perform database operation to get user by email
	user, err := db.GetUserByEmail(email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user"})
		return
	}

	// Return user data as JSON response
	c.JSON(http.StatusOK, user)
}

func getUserByUsernameHandler(c *gin.Context) {
	// Extract username from request parameters
	username := c.Param("username")

	// Perform database operation to get user by username
	user, err := db.GetUserByUsername(username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user"})
		return
	}

	// Return user data as JSON response
	c.JSON(http.StatusOK, user)
}

func getUserBlogPostsHandler(c *gin.Context) {
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

func getUserCommentsHandler(c *gin.Context) {
	// Extract user ID from request parameters
	userIDStr := c.Param("id")
	// Perform database operation to get comments by user ID
	comments, err := db.GetCommentsByUserID(userIDStr)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user comments"})
		return
	}

	// Return comments data as JSON response
	c.JSON(http.StatusOK, comments)
}

func getAllBlogPostsHandler(c *gin.Context) {
	// Perform database operation to get all blog posts
	blogs, err := db.GetAllBlogPosts()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch blog posts"})
		return
	}

	// Return blog posts data as JSON response
	c.JSON(http.StatusOK, blogs)
}

func getAllUsersHandler(c *gin.Context) {
	// Perform database operation to get all users
	users, err := db.GetAllUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch users"})
		return
	}

	// Return users data as JSON response
	c.JSON(http.StatusOK, users)
}

func SignupHandler(c *gin.Context) {
	// Parse JSON request body
	var req models.User
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
		return
	}
	hashedPassword := utils.HashPassword(req.Password)

	// Create a new user in the database
	user, err := db.CreateUser(req.Username, req.Email, hashedPassword)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	// Return user data as JSON response
	c.JSON(http.StatusOK, user)
}
