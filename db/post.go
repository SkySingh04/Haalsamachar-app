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

func CreateCommentForBlogID(userID int, blogID int, Content string) (*models.Comment, error) {
	// Execute SQL query to create comment for blog ID
	query := "INSERT INTO comments (user_id, blog_id, content) VALUES ($1, $2, $3) RETURNING id, user_id, blog_id, content, created_at"
	row := db.QueryRow(query, userID, blogID, Content)
	comment := &models.Comment{}
	err := row.Scan(&comment.ID, &comment.UserID, &comment.BlogID, &comment.Content, &comment.CreatedAt)
	if err != nil {
		log.Printf("Error scanning comment row: %v\n", err)
		return nil, err
	}
	return comment, nil
}

func CreateUser(Username string, Email string, Password string) (*models.User, error) {
	// Execute SQL query to create user
	query := "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, password"
	row := db.QueryRow(query, Username, Email, Password)
	user := &models.User{}
	err := row.Scan(&user.ID, &user.Username, &user.Email, &user.Password)
	if err != nil {
		log.Printf("Error scanning user row: %v\n", err)
		return nil, err
	}
	return user, nil
}
