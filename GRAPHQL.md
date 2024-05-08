# HaalSamachar GraphQL API Documentation

Welcome to the GraphQL API documentation for HaalSamachar. This API was built using gqlgen and is deployed on Render (Thank the lord for their free tier).

## Types

### User
- **ID:** The unique identifier for the user.
- **Username:** The username of the user.
- **Email:** The email address of the user.
- **Password:** The password of the user.

### BlogPost
- **ID:** The unique identifier for the blog post.
- **UserID:** The ID of the user who created the blog post.
- **Title:** The title of the blog post.
- **Content:** The content of the blog post.
- **CreatedAt:** The timestamp when the blog post was created.
- **Subtitle:** The subtitle of the blog post.
- **Image:** The image associated with the blog post.
- **SpotifyLink:** The Spotify link associated with the blog post.
- **UploadedImageLink:** The uploaded image link associated with the blog post.

### Comment
- **ID:** The unique identifier for the comment.
- **UserID:** The ID of the user who created the comment.
- **BlogID:** The ID of the blog post to which the comment belongs.
- **Content:** The content of the comment.
- **CreatedAt:** The timestamp when the comment was created.

### BlogCreateRequest
- **UserID:** The ID of the user creating the blog post.
- **Title:** The title of the blog post.
- **Content:** The content of the blog post.
- **Subtitle:** The subtitle of the blog post.
- **Image:** The image associated with the blog post.
- **SpotifyLink:** The Spotify link associated with the blog post.
- **UploadedImageLink:** The uploaded image link associated with the blog post.

### BlogUpdateRequest
- **UserID:** The ID of the user updating the blog post.
- **BlogID:** The ID of the blog post to be updated.
- **Title:** The updated title of the blog post.
- **Content:** The updated content of the blog post.
- **Subtitle:** The updated subtitle of the blog post.
- **Image:** The updated image associated with the blog post.
- **SpotifyLink:** The updated Spotify link associated with the blog post.
- **UploadedImageLink:** The updated uploaded image link associated with the blog post.

### CommentCreateRequest
- **UserID:** The ID of the user creating the comment.
- **BlogID:** The ID of the blog post to which the comment belongs.
- **Content:** The content of the comment.

### CommentUpdateRequest
- **BlogID:** The ID of the blog post to which the comment belongs.
- **CommentID:** The ID of the comment to be updated.
- **Content:** The updated content of the comment.

### LoginRequest
- **Username:** The username of the user for authentication.
- **Password:** The password of the user for authentication.

### LoginResponse
- **Token:** The authentication token generated upon successful login.

## Queries

- **users:** Retrieve a list of all users.
- **user(UserID: ID!):** Retrieve a user by their ID.
- **userByUsername(Username: String!):** Retrieve a user by their username.
- **userByEmail(Email: String!):** Retrieve a user by their email.
- **blogPosts:** Retrieve a list of all blog posts.
- **blogPost(BlogID: ID!):** Retrieve a blog post by its ID.
- **blogPostsByUser(UserID: ID!):** Retrieve a list of blog posts created by a specific user.
- **comments(BlogID: ID!):** Retrieve a list of comments for a specific blog post.
- **commentsByUser(UserID: ID!):** Retrieve a list of comments created by a specific user.
- **comment(CommentID: ID!):** Retrieve a comment by its ID.

## Mutations

- **createUser(Username: String!, Email: String!, Password: String!):** Create a new user.
- **createBlogPost(UserID: ID!, Title: String!, Content: String!, Subtitle: String!, Image: String!, SpotifyLink: String!, UploadedImageLink: String!):** Create a new blog post.
- **createComment(UserID: ID!, BlogID: ID!, Content: String!):** Create a new comment.
- **updateBlogPost(UserID: ID!, BlogID: ID!, Title: String, Content: String, Subtitle: String, Image: String, SpotifyLink: String, UploadedImageLink: String):** Update an existing blog post.
- **updateComment(BlogID: ID!, CommentID: ID!, Content: String):** Update an existing comment.
- **deleteBlogPost(BlogID: ID!):** Delete a blog post.
- **deleteComment(CommentID: ID!):** Delete a comment.

## Authentication

Authentication is handled through the login mutation, which takes a username and password as input and returns a token upon successful authentication. This token can then be used for authorization purposes when accessing protected resources.

