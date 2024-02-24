package db

import (
	"blog/contracttesting/models"
	"log"
)

func UpdateBlogForUserID(userID int, blogID int, Title string, Content string, Subtitle string, Image string) (*models.BlogPost, error) {
	// Execute SQL query to update blog for user ID
	query := "UPDATE blog_posts SET title = $1, content = $2 , subtitle = $5 , image = $6  WHERE id = $3 AND user_id = $4 RETURNING id, user_id, title, content, created_at , subtitle , image"
	row := db.QueryRow(query, Title, Content, blogID, userID, Subtitle, Image)
	blog := &models.BlogPost{}
	err := row.Scan(&blog.ID, &blog.UserID, &blog.Title, &blog.Content, &blog.CreatedAt, &blog.Subtitle, &blog.Image)
	if err != nil {
		log.Printf("Error scanning blog row: %v\n", err)
		return nil, err
	}
	return blog, nil
}

func UpdateCommentForCommentId(blogId int, commentID int, Content string) (*models.Comment, error) {
	// Execute SQL query to update comment for comment ID
	query := "UPDATE comments SET content = $1 WHERE id = $2 AND blog_id = $3 RETURNING id, user_id, blog_id, content, created_at"
	row := db.QueryRow(query, Content, commentID, blogId)
	comment := &models.Comment{}
	err := row.Scan(&comment.ID, &comment.UserID, &comment.BlogID, &comment.Content, &comment.CreatedAt)
	if err != nil {
		log.Printf("Error scanning comment row: %v\n", err)
		return nil, err
	}
	return comment, nil
}
