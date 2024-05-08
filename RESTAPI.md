#### The REST API is deployed on 4 different services on Render (Thank the lord for their free tier)


### Blog Service API Documentation

#### Get Blog Post
- **URL**: `/:id/blogs/:blogID`
- **Method**: `GET`
- **Description**: Get a specific blog post.
- **Response**:
  - **Status Code**: `200`
    ```json
    {
      "id": 1,
      "title": "string",
      "content": "string",
      "created_at": "string"
    }
    ```

#### Delete Blog Post
- **URL**: `/:id/blogs/:blogID`
- **Method**: `DELETE`
- **Description**: Delete a specific blog post.
- **Response**:
  - **Status Code**: `200`
    ```json
    {
      "message": "Blog post deleted successfully"
    }
    ```

#### Create Blog Post
- **URL**: `/blogs`
- **Method**: `POST`
- **Description**: Create a new blog post.
- **Request Body**:
  ```json
  {
    "title": "string",
    "content": "string"
  }
  ```
- **Response**:
  - **Status Code**: `200`
    ```json
    {
      "id": 1,
      "title": "string",
      "content": "string",
      "created_at": "string"
    }
    ```

#### Update Blog Post
- **URL**: `/blogs`
- **Method**: `PUT`
- **Description**: Update an existing blog post.
- **Request Body**:
  ```json
  {
    "id": 1,
    "title": "string",
    "content": "string"
  }
  ```
- **Response**:
  - **Status Code**: `200`
    ```json
    {
      "id": 1,
      "title": "string",
      "content": "string",
      "created_at": "string"
    }
    ```

### Comment Service API Documentation

#### Add Comment
- **URL**: `/comments`
- **Method**: `POST`
- **Description**: Add a new comment to a blog post.
- **Request Body**:
  ```json
  {
    "userID": 1,
    "blogID": 1,
    "content": "string"
  }
  ```
- **Response**:
  - **Status Code**: `200`
    ```json
    {
      "id": 1,
      "userID": 1,
      "blogID": 1,
      "content": "string",
      "created_at": "string"
    }
    ```

#### Get Comments
- **URL**: `/blogs/:blogID/comments`
- **Method**: `GET`
- **Description**: Get all comments for a specific blog post.
- **Response**:
  - **Status Code**: `200`
    ```json
    [
      {
        "id": 1,
        "userID": 1,
        "blogID": 1,
        "content": "string",
        "created_at": "string"
      }
    ]
    ```

#### Update Comment
- **URL**: `/comments`
- **Method**: `PUT`
- **Description**: Update an existing comment.
- **Request Body**:
  ```json
  {
    "id": 1,
    "userID": 1,
    "content": "string"
  }
  ```
- **Response**:
  - **Status Code**: `200`
    ```json
    {
      "id": 1,
      "userID": 1,
      "blogID": 1,
      "content": "string",
      "created_at": "string"
    }
    ```

#### Delete Comment
- **URL**: `/comments/:commentID`
- **Method**: `DELETE`
- **Description**: Delete a specific comment.
- **Response**:
  - **Status Code**: `200`
    ```json
    {
      "message": "Comment deleted successfully"
    }
    ```

### User Service API Documentation

#### Get User by ID
- **URL**: `/users/:id`
- **Method**: `GET`
- **Description**: Get user details by ID.
- **Response**:
  - **Status Code**: `200`
    ```json
    {
      "id": 1,
      "username": "string",
      "email": "string"
    }
    ```

#### Get User's Blog Posts
- **URL**: `/users/:id/blogs`
- **Method**: `GET`
- **Description**: Get all blog posts of a user.
- **Response**:
  - **Status Code**: `200`
    ```json
    [
      {
        "id": 1,
        "title": "string",
        "content": "string",
        "created_at": "string"
      }
    ]
    ```

#### Get User's Comments
- **URL**: `/users/:id/comments`
- **Method**: `GET`
- **Description**: Get all comments of a user.
- **Response**:
  - **Status Code**: `200`
    ```json
    [
      {
        "id": 1,
        "userID": 1,
        "blogID": 1,
        "content": "string",
        "created_at": "string"
      }
    ]
    ```

#### Signup
- **URL**: `/users`
- **Method**: `POST`
- **Description**: User signup endpoint.
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **Status Code**: `200`
    ```json
    {
      "message": "User signed up successfully"
    }
    ```
  - **Status Code**: `400`
    ```json
    {
      "error": "Invalid request"
    }
    ```
  - **Status Code**: `409`
    ```json
    {
     "error": "Username already exists"
    }
    ```

### Auth Service API Documentation

#### Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Description**: User login endpoint.
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **Status Code**: `200`
    ```json
    {
      "token": "string"
    }
    ```
  - **Status Code**: `400`
    ```json
    {
      "error": "Invalid JSON payload"
    }
    ```
  - **Status Code**: `401`
    ```json
    {
      "error": "Invalid credentials"
    }
    ```

#### Verify Token
- **URL**: `/api/auth/verify`
- **Method**: `GET`
- **Description**: Endpoint to verify the authenticity of a token.
- **Response**:
  - **Status Code**: `200`
    ```json
    {
      "message": "Token is valid"
    }
    ```

#### Refresh Token
- **URL**: `/api/auth/refresh`
- **Method**: `POST`
- **Description**: Refresh the authentication token.
- **Response**:
  - **Status Code**: `200`
    ```json
    {
      "token": "new_dummy_token"
    }
    ```