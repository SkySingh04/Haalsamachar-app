package models

type User struct {
	ID       string
	Username string
	Email    string
	Password string
}

type BlogPost struct {
	ID        int    `json:"id"`
	UserID    int    `json:"user_id"`
	Title     string `json:"title"`
	Content   string `json:"content"`
	CreatedAt string `json:"created_at"`
	Subtitle  string `json:"subtitle"`
	Image     string `json:"image"`
}

type Comment struct {
	ID        int    `json:"id"`
	UserID    int    `json:"user_id"`
	BlogID    int    `json:"blog_id"`
	Content   string `json:"content"`
	CreatedAt string `json:"created_at"`
}

type BlogCreateRequest struct {
	UserID   int    `json:"userId"`
	Title    string `json:"title"`
	Content  string `json:"content"`
	Subtitle string `json:"subtitle"`
	Image    string `json:"image"`
}

type BlogUpdateRequest struct {
	UserID   int    `json:"userId"`
	BlogID   int    `json:"blogId"`
	Title    string `json:"title"`
	Content  string `json:"content"`
	Subtitle string `json:"subtitle"`
	Image    string `json:"image"`
}

type CommentCreateRequest struct {
	UserID  int    `json:"userId"`
	BlogID  int    `json:"blogId"`
	Content string `json:"content"`
}

type CommentUpdateRequest struct {
	BlogId    int    `json:"blogId"`
	CommentID int    `json:"commentId"`
	Content   string `json:"content"`
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Token string `json:"token"`
}
