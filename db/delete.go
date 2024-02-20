package db

import (
	"log"
)

func DeleteBlogForUserID(userID string, blogID string) error {
	// Execute SQL query to delete blog for user ID
	query := "DELETE FROM blog_posts WHERE id = $1 AND user_id = $2"
	_, err := db.Exec(query, blogID, userID)
	if err != nil {
		log.Printf("Error executing query: %v\n", err)
		return err
	}
	return nil
}
