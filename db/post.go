package db

import (
	"blog/contracttesting/models"
	"log"
)

func CreateBlogForUserID(userID int, Title string, Content string) (*models.BlogPost, error) {
	// Execute SQL query to create blog for user ID
	query := "INSERT INTO blog_posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING id, user_id, title, content, created_at"
	row := db.QueryRow(query, userID, Title, Content)
	blog := &models.BlogPost{}
	err := row.Scan(&blog.ID, &blog.UserID, &blog.Title, &blog.Content, &blog.CreatedAt)
	if err != nil {
		log.Printf("Error scanning blog row: %v\n", err)
		return nil, err
	}
	return blog, nil
}
