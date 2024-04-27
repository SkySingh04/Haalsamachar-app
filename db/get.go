package db

import (
	"blog/contracttesting/models"
	"database/sql"
	"log"
)

func GetUserByID(userID int) (*models.User, error) {
	query := "SELECT id, username, email , password FROM users WHERE id = $1"
	row := db.QueryRow(query, userID)

	user := &models.User{}
	err := row.Scan(&user.ID, &user.Username, &user.Email, &user.Password)
	if err != nil {
		log.Printf("Error scanning user row: %v\n", err)
		return nil, err
	}

	return user, nil
}

func GetAllUsers() ([]*models.User, error) {
	// Execute SQL query to fetch all users
	query := "SELECT id, username, email FROM users"
	rows, err := db.Query(query)
	if err != nil {
		log.Printf("Error executing query: %v\n", err)
		return nil, err
	}
	defer rows.Close()
	usersSlice := []*models.User{}
	for rows.Next() {
		user := &models.User{}
		err := rows.Scan(&user.ID, &user.Username, &user.Email)
		if err != nil {
			log.Printf("Error scanning user row: %v\n", err)
			return nil, err
		}
		usersSlice = append(usersSlice, user)
	}
	return usersSlice, nil
}

func GetAllBlogPosts() ([]*models.BlogPost, error) {
	// Execute SQL query to fetch all blog posts
	query := "SELECT id, user_id, title, content, created_at, subtitle, image ,  spotify_link , uploaded_image_link  FROM blog_posts"
	rows, err := db.Query(query)
	if err != nil {
		log.Printf("Error executing query: %v\n", err)
		return nil, err
	}
	defer rows.Close()
	blogsSlice := []*models.BlogPost{}
	for rows.Next() {
		blog := &models.BlogPost{}
		var uploadedImageLink sql.NullString // Use sql.NullString to handle NULL values
		err := rows.Scan(&blog.ID, &blog.UserID, &blog.Title, &blog.Content, &blog.CreatedAt, &blog.Subtitle, &blog.Image , &blog.SpotifyLink , &uploadedImageLink)
		if err != nil {
			log.Printf("Error scanning blog row: %v\n", err)
			return nil, err
		}
		if uploadedImageLink.Valid { // Check if the value is not NULL
			blog.UploadedImageLink = uploadedImageLink.String // Assign the value to the struct field
		} else {
			blog.UploadedImageLink = "" // If NULL, assign an empty string or handle it as needed
		}
		blogsSlice = append(blogsSlice, blog)
	}
	return blogsSlice, nil
}

func GetUserByUsername(username string) (*models.User, error) {
	query := "SELECT id, username, email , Password FROM users WHERE username = $1"
	row := db.QueryRow(query, username)

	user := &models.User{}
	err := row.Scan(&user.ID, &user.Username, &user.Email, &user.Password)
	if err != nil {
		log.Printf("Error scanning user row: %v\n", err)
		return nil, err
	}

	return user, nil
}

func GetUserByEmail(email string) (*models.User, error) {
	query := "SELECT id, username, email , Password FROM users WHERE email = $1"
	row := db.QueryRow(query, email)

	user := &models.User{}
	err := row.Scan(&user.ID, &user.Username, &user.Email, &user.Password)
	if err != nil {
		log.Printf("Error scanning user row: %v\n", err)
		return nil, err
	}

	return user, nil
}

func GetBlogPostsByUserID(userID int) ([]*models.BlogPost, error) {
	// Execute SQL query to fetch blog posts by user ID
	query := "SELECT id, user_id, title, content, subtitle , image , created_at , spotify_link , uploaded_image_link  FROM blog_posts WHERE user_id = $1"
	rows, err := db.Query(query, userID)
	if err != nil {
		log.Printf("Error executing query: %v\n", err)
		return nil, err
	}
	defer rows.Close()
	blogsSlice := []*models.BlogPost{}
	for rows.Next() {
		blog := &models.BlogPost{}
		err := rows.Scan(&blog.ID, &blog.UserID, &blog.Title, &blog.Content, &blog.CreatedAt , &blog.Subtitle , &blog.Image , &blog.SpotifyLink , &blog.UploadedImageLink)
		if err != nil {
			log.Printf("Error scanning blog row: %v\n", err)
			return nil, err
		}
		blogsSlice = append(blogsSlice, blog)
	}
	return blogsSlice, nil
}

func GetCommentsByUserID(userID string) ([]*models.Comment, error) {
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

func GetBlogForBlogID(blogID string) (*models.BlogPost, error) {
	// Implement blog retrieval logic
	query := "SELECT id, user_id, title, content, subtitle , image , created_at , spotify_link , uploaded_image_link FROM blog_posts WHERE id = $1"
	row := db.QueryRow(query, blogID)
	blog := &models.BlogPost{}
	err := row.Scan(&blog.ID, &blog.UserID, &blog.Title, &blog.Content, &blog.Subtitle, &blog.Image, &blog.CreatedAt , &blog.SpotifyLink , &blog.UploadedImageLink)
	if err != nil {
		log.Printf("Error scanning blog row: %v\n", err)
		return nil, err
	}
	return blog, nil
}

func GetCommentsByBlogID(BlogId string) ([]*models.Comment, error) {
	// Execute SQL query to fetch comments by blog ID
	query := "SELECT id, user_id, blog_id, content, created_at FROM comments WHERE blog_id = $1"
	rows, err := db.Query(query, BlogId)
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

func GetCommentForCommentID(commentID string) (*models.Comment, error) {
	// Implement comment retrieval logic
	query := "SELECT id, user_id, blog_id, content, created_at FROM comments WHERE id = $1"
	row := db.QueryRow(query, commentID)
	comment := &models.Comment{}
	err := row.Scan(&comment.ID, &comment.UserID, &comment.BlogID, &comment.Content, &comment.CreatedAt)
	if err != nil {
		log.Printf("Error scanning comment row: %v\n", err)
		return nil, err
	}
	return comment, nil
}