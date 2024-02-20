# HaalSamachar : A Blog Website built with GoLang+Gin in the backend and NextJs+TypeScript in the frontend with PostgreSQL powered database. 

This GoLang application is designed to serve as a blog website that implements multiple services for contract testing. It allows developers to test the contracts between different services to ensure that they communicate as expected.

## Features

- **Blog Website**: The application provides basic functionalities of a blog website, including creating, reading, updating, and deleting blog posts.
- **Multiple Services**: The application is divided into multiple services, each responsible for specific functionalities such as user authentication, post management, and comment handling.
- **Contract Testing**: Utilizes contract testing to verify the interactions and agreements between different services, ensuring that they work together seamlessly.
- **Modular Design**: Built with a modular design approach, making it easy to add new services or modify existing ones without impacting the entire application.

## API Documentation

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

## Getting Started

To get started with this application, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine.

2. **Install Dependencies**: Ensure you have GoLang installed on your system. Then, navigate to the project directory and run:
   ```
   go mod tidy
   ```

3. **Configure Services**: Configure the services according to your requirements. Each service may have its own configuration files or environment variables that need to be set.

4. **Run Tests**: Run the contract tests to verify the interactions between services:
   ```
   go test ./...
   ```

5. **Start the Application**: Start the application by running:
   ```
   go run main.go
   ```

6. **Access the Blog Website**: Once the application is running, you can access the blog website through your web browser at `http://localhost:8080`.

## Contributing

Contributions are welcome! If you have any ideas for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
