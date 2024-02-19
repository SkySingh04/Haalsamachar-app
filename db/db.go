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

func GetCommentsByUserID(userID int) ([]*models.Comment, error) {
	// Execute SQL query to fetch comments by user ID
	query := "SELECT id, user_id, blog_id, content, created_at FROM comments WHERE user_id = $1"
	rows, err := db.Query(query, userID)
	if err != nil {
		log.Printf("Error executing query: %v\n", err)
		return nil, err
	}
	defer rows.Close()
	commentsSlice := []*models.Comment{}
	for rows.Next() {
		comment := &models.Comment{}
		err := rows.Scan(&comment.ID, &comment.UserID, &comment.BlogID, &comment.Content, &comment.CreatedAt)
		if err != nil {
			log.Printf("Error scanning comment row: %v\n", err)
			return nil, err
		}
		commentsSlice = append(commentsSlice, comment)
	}
	return commentsSlice, nil
}

func CreateBlogPostsTable() {
	// SQL statement to create the blog_posts table
	const createTableQuery = `
    CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `

	// Execute the SQL statement to create the table
	_, err := db.Exec(createTableQuery)
	if err != nil {
		log.Fatalf("Error creating blog_posts table: %v", err)
	}

	log.Println("blog_posts table created successfully")
}

func CreateUsersTable() {
	// SQL statement to create the users table
	const createTableQuery = `
	CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY,
		username VARCHAR(255) NOT NULL,
		email VARCHAR(255) NOT NULL
	);
	`

	// Execute the SQL statement to create the table
	_, err := db.Exec(createTableQuery)
	if err != nil {
		log.Fatalf("Error creating users table: %v", err)
	}

	log.Println("users table created successfully")
}

func CreateCommentsTable() {
	// SQL statement to create the comments table
	const createTableQuery = `
	CREATE TABLE IF NOT EXISTS comments (
		id SERIAL PRIMARY KEY,
		user_id INTEGER NOT NULL REFERENCES users(id),
		blog_id INTEGER NOT NULL REFERENCES blog_posts(id),
		content TEXT NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);
	`

	// Execute the SQL statement to create the table
	_, err := db.Exec(createTableQuery)
	if err != nil {
		log.Fatalf("Error creating comments table: %v", err)
	}

	log.Println("comments table created successfully")
}
