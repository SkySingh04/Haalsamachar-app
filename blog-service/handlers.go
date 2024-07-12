package main

import (
	"blog/contracttesting/db"
	"blog/contracttesting/models"
	"net/http"
	"strconv"

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
	blog, err := db.CreateBlogForUserID(req.UserID, req.Title, req.Content, req.Subtitle, req.Image , req.SpotifyLink , req.UploadedImageLink)
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
	blog, err := db.UpdateBlogForUserID(req.UserID, req.BlogID, req.Title, req.Content, req.Subtitle, req.Image , req.SpotifyLink , req.UploadedImageLink)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update blog"})
		return
	}

	// Return blog data as JSON response
	c.JSON(http.StatusOK, blog)

}

func deleteblogHandler(c *gin.Context) {
	// Implement blog deletion logic
	var blogID = c.Param("blogID")

	err := db.DeleteBlogForBlogID(blogID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete blog"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Blog deleted successfully"})
}

func getAllCategoriesHandler(c *gin.Context) {
	// Implement logic to fetch all categories
	categories, err := db.GetAllCategories()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve categories"})
		return
	}

	c.JSON(http.StatusOK, categories)
}

func getCategoriesByBlogIDHandler(c *gin.Context) {
	// Implement logic to fetch categories by blog ID
	blogID := c.Param("blogID")
	intBlogID, err := strconv.Atoi(blogID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid blog ID"})
		return
	}
	categories, err := db.GetCategoriesByBlogID(intBlogID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve categories for blog"})
		return
	}

	c.JSON(http.StatusOK, categories)
}