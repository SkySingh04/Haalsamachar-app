package main

import (
	"blog/contracttesting/db"
	"blog/contracttesting/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func healthCheckHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Blog service is healthy"})
}

func createblogHandler(c *gin.Context) {
	// Bind the JSON payload of the request to a struct
	var req models.BlogCreateRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
		return
	}

	// Perform database operation to create blog for user ID
	blog, err := db.CreateBlogForUserID(req.UserID, req.Title, req.Content, req.Subtitle, req.Image)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create blog"})
		return
	}

	// Return blog data as JSON response
	c.JSON(http.StatusOK, blog)
}

func getblogHandler(c *gin.Context) {
	// Implement blog retrieval logic
	var blog *models.BlogPost
	var blogID = c.Param("blogID")

	blog, err := db.GetBlogForBlogID(blogID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve blog"})
		return
	}

	c.JSON(http.StatusOK, *blog)

}

func updateblogHandler(c *gin.Context) {
	// Implement blog update logic
	var req models.BlogUpdateRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
		return
	}

	// Perform database operation to update blog for user ID
	blog, err := db.UpdateBlogForUserID(req.UserID, req.BlogID, req.Title, req.Content)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update blog"})
		return
	}

	// Return blog data as JSON response
	c.JSON(http.StatusOK, blog)

}

func deleteblogHandler(c *gin.Context) {
	// Implement blog deletion logic
	var userID = c.Param("id")
	var blogID = c.Param("blogID")

	err := db.DeleteBlogForUserID(userID, blogID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete blog"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Blog deleted successfully"})
}
