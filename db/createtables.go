package db

import "log"

func CreateBlogPostsTable() {
	// SQL statement to create the blog_posts table
	const createTableQuery = `
    CREATE TABLE IF NOT EXISTS blog_posts (
		id SERIAL PRIMARY KEY,
		user_id INTEGER NOT NULL REFERENCES users(id),
		title TEXT NOT NULL,
		content TEXT NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		subtitle TEXT NOT NULL,
		image TEXT,
		spotify_link TEXT
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
		email VARCHAR(255) NOT NULL,
		password VARCHAR(255) NOT NULL
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
