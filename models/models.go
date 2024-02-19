package models

type User struct {
	ID       string
	Username string
	Email    string
	// Add more fields as needed
}

type BlogPost struct {
	ID        int    `json:"id"`
	UserID    int    `json:"user_id"`
	Title     string `json:"title"`
	Content   string `json:"content"`
	CreatedAt string `json:"created_at"`
}
