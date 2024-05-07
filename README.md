## HaalSamachar : A Blog Website built with GoLang with multiple services which include a graphQL API using gqlgen and three REST APIs built using Gin and NextJs+TypeScript in the frontend with PostgreSQL powered database, containerized using Docker and deployed using Kubernetes. 


## Features

- graphQL server using gqlgen , rest server using gin mongo, docker, kubernetes ,  nextjs  ssr.
- Write about CI/CD 
- add docs about how to start the kubernetes clustrer

Tech: GO : gin and gqlgen
Docker and kubernetes
Nextjs : Ts and tailwind
Posgresql
firebase auth

## Getting Started

To get started with this application, follow these steps:

1. **Clone the Repository**: Clone the repository to your local machine.
   
2. **Install Dependencies**: Ensure Docker and Docker Compose are installed on your system.

3. **Configure Environment Variables**: Create a `.env` file in the project root directory and set the required environment variables for each service.

4. **Run the Application**: Use Docker Compose to build and start the services:
   ```bash
   docker-compose up
   ```
   This command will build and start all services defined in the `docker-compose.yml` file.

5. **Access the Application**: Once the services are running, access the blog website through your web browser at respective localhost ports [ 8081 , 8082 , 8083 , 8084 ].


## API Documentation 

refactor this t0o two files: graphQL api docs and rest api docs

#### The API is deployed on 4 different services on Render (Thank the lord for their free tier)

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


## Contributing

Contributions are welcome! If you have any ideas for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
