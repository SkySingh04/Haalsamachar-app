package db

import (
	"blog/contracttesting/models"
	"log"
	"math/rand"
	"time"
)

func generateRandomID() int {
	rand.Seed(time.Now().UnixNano())
	min := 100000
	max := 999999
	return rand.Intn(max-min+1) + min
}

func CreateBlogForUserID(userID int, Title string, Content string, Subtitle string, Image string) (*models.BlogPost, error) {
	// Execute SQL query to create blog for user ID
	query := "INSERT INTO blog_posts (id, user_id, title, content, created_at, subtitle, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, user_id, title, content, created_at, subtitle, image"
	row := db.QueryRow(query, generateRandomID(), userID, Title, Content, time.Now(), Subtitle, Image)
	blog := &models.BlogPost{}
	err := row.Scan(&blog.ID, &blog.UserID, &blog.Title, &blog.Content, &blog.CreatedAt, &blog.Subtitle, &blog.Image)
	if err != nil {
		log.Printf("Error scanning blog row: %v\n", err)
		return nil, err
	}
	return blog, nil
}

func CreateCommentForBlogID(userID int, blogID int, Content string) (*models.Comment, error) {
	// Execute SQL query to create comment for blog ID
	query := "INSERT INTO comments (id, user_id, blog_id, content) VALUES ($1, $2, $3, $4) RETURNING id, user_id, blog_id, content, created_at"
	row := db.QueryRow(query, generateRandomID(), userID, blogID, Content)
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
	query := "INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING id, username, email, password"
	row := db.QueryRow(query, generateRandomID(), Username, Email, Password)
	user := &models.User{}
	err := row.Scan(&user.ID, &user.Username, &user.Email, &user.Password)
	if err != nil {
		log.Printf("Error scanning user row: %v\n", err)
		return nil, err
	}
	return user, nil
}
