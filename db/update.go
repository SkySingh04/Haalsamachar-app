package db

import (
	"blog/contracttesting/models"
	"log"
)

func UpdateBlogForUserID(userID int, blogID int, Title string, Content string) (*models.BlogPost, error) {
	// Execute SQL query to update blog for user ID
	query := "UPDATE blog_posts SET title = $1, content = $2 WHERE id = $3 AND user_id = $4 RETURNING id, user_id, title, content, created_at"
	row := db.QueryRow(query, Title, Content, blogID, userID)
	blog := &models.BlogPost{}
	err := row.Scan(&blog.ID, &blog.UserID, &blog.Title, &blog.Content, &blog.CreatedAt)
	if err != nil {
		log.Printf("Error scanning blog row: %v\n", err)
		return nil, err
	}
	return blog, nil
}
