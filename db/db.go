// db/db.go

package db

import (
	"blog/contracttesting/models"
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

var db *sql.DB

func InitDB() *sql.DB {
	const (
		host     = "localhost"
		port     = "5432"
		user     = "postgres"
		password = "postgres"
		dbname   = "postgres"
	)
	connStr := "host=" + host + " port=" + port + " user=" + user + " password=" + password + " dbname=" + dbname + " sslmode=disable"

	var err error
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Error connecting to the database: ", err)
	}

	// Ping the database to check if the connection is successful
	err = db.Ping()
	if err != nil {
		log.Fatal("Error pinging the database: ", err)
	}

	log.Println("Successfully connected to the database")
	return db
}

func CloseDB() {
	if db != nil {
		db.Close()
	}
}

// // Define functions/methods for performing database operations (e.g., CRUD operations)
// // Example:
func GetUserByID(userID int) (*models.User, error) {
	query := "SELECT id, username, email FROM users WHERE id = $1"
	row := db.QueryRow(query, userID)

	user := &models.User{}
	err := row.Scan(&user.ID, &user.Username, &user.Email)
	if err != nil {
		log.Printf("Error scanning user row: %v\n", err)
		return nil, err
	}

	return user, nil
}

func GetBlogPostsByUserID(userID int) ([]*models.BlogPost, error) {
	// Execute SQL query to fetch blog posts by user ID
	query := "SELECT id, user_id, title, content, created_at FROM blog_posts WHERE user_id = $1"
	rows, err := db.Query(query, userID)
	if err != nil {
		log.Printf("Error executing query: %v\n", err)
		return nil, err
	}
	defer rows.Close()
	blogsSlice := []*models.BlogPost{}
	for rows.Next() {
		blog := &models.BlogPost{}
		err := rows.Scan(&blog.ID, &blog.UserID, &blog.Title, &blog.Content, &blog.CreatedAt)
		if err != nil {
			log.Printf("Error scanning blog row: %v\n", err)
			return nil, err
		}
		blogsSlice = append(blogsSlice, blog)
	}
	return blogsSlice, nil
}

// // Define structs, types, and other necessary utilities for database operations
