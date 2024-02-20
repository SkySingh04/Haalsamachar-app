package main

import (
	"blog/contracttesting/db"
	"blog/contracttesting/models"
	"blog/contracttesting/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func loginHandler(c *gin.Context) {
	// Parse JSON request body
	var req models.LoginRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
		return
	}

	// Query the database to find the user by username
	user, err := db.GetUserByUsername(req.Username)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Compare the hashed password stored in the database with the provided password
	hashedPassword := utils.HashPassword(req.Password)
	if user.Password != hashedPassword {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Generate JWT token
	token, err := utils.GenerateToken(user.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// Return token as JSON response
	c.JSON(http.StatusOK, models.LoginResponse{Token: token})
}

func verifyHandler(c *gin.Context) {
	// Get token from request header
	tokenString := c.GetHeader("Authorization")
	if tokenString == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Token is missing"})
		return
	}

	// Validate token
	claims, err := utils.ValidateToken(tokenString)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		return
	}

	// Token is valid, return success message
	c.JSON(http.StatusOK, gin.H{"message": "Token is valid", "claims": claims})
}

func refreshTokenHandler(c *gin.Context) {
	// Get token from request header
	tokenString := c.GetHeader("Authorization")
	if tokenString == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Token is missing"})
		return
	}

	// Validate token
	claims, err := utils.ValidateToken(tokenString)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		return
	}

	// Generate new token
	newToken, err := utils.GenerateToken(claims["username"].(string))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate new token"})
		return
	}

	// Return new token as JSON response
	c.JSON(http.StatusOK, gin.H{"new_token": newToken})
}
