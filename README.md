# GoLang Blog Website with Multiple Services for Contract Testing

This GoLang application is designed to serve as a blog website that implements multiple services for contract testing. It allows developers to test the contracts between different services to ensure that they communicate as expected.

## Features

- **Blog Website**: The application provides basic functionalities of a blog website, including creating, reading, updating, and deleting blog posts.
- **Multiple Services**: The application is divided into multiple services, each responsible for specific functionalities such as user authentication, post management, and comment handling.
- **Contract Testing**: Utilizes contract testing to verify the interactions and agreements between different services, ensuring that they work together seamlessly.
- **Modular Design**: Built with a modular design approach, making it easy to add new services or modify existing ones without impacting the entire application.

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
