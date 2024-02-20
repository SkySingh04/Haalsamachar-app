package main

import (
	"blog/contracttesting/db"
	"blog/contracttesting/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Define handlers
func addCommentHandler(c *gin.Context) {
	// Implement add comment logic
	var req *models.CommentCreateRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
		return
	}
	// Call the comment service to add the comment
	comment, err := db.CreateCommentForBlogID(req.BlogID, req.UserID, req.Content)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add comment"})
		return
	}
	c.JSON(http.StatusOK, comment)

}

func getCommentsHandler(c *gin.Context) {
	// Implement get comments logic
	blogId := c.Param("blogID")
	// Call the comment service to get comments for the blog ID
	comments, err := db.GetCommentsByBlogID(blogId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve comments"})
		return
	}
	c.JSON(http.StatusOK, comments)
	// Return the comments as JSON response

}

func updateCommentHandler(c *gin.Context) {
	// Implement update comment logic
	var req *models.CommentUpdateRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
		return
	}
	// Call the comment service to update the comment
	comment, err := db.UpdateCommentForCommentId(req.BlogId, req.CommentID, req.Content)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update comment"})
		return
	}
	c.JSON(http.StatusOK, comment)

}

func deleteCommentHandler(c *gin.Context) {
	// Implement delete comment logic
	commentId := c.Param("commentID")
	// Call the comment service to delete the comment
	err := db.DeleteCommentByID(commentId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete comment"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Comment deleted successfully"})

}
