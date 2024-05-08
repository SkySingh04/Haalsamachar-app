## HaalSamachar : Backend Microservices built with GoLang including a GraphQL API built using gqlgen and four REST APIs built using Gin and frontend built with NextJs+TypeScript with PostgreSQL powered database, containerized using Docker and deployed using Kubernetes.

## Features

- **GraphQL API:** Utilizing gqlgen for creating a GraphQL server to efficiently query and manipulate data.
- **REST APIs:** Three REST APIs are built using Gin for handling various functionalities.
- **Docker & Kubernetes:** Containerized using Docker and deployed using Kubernetes for scalability and reliability.
- **Next.js with SSR:** Frontend developed using Next.js for server-side rendering (SSR) along with TypeScript and Tailwind CSS.
- **PostgreSQL:** Utilized as the database to store and manage data efficiently.
- **Firebase Auth:** Integrated Firebase authentication for user authentication and authorization.

## Continuous Integration/Continuous Deployment (CI/CD)

CI/CD pipelines automate the process of testing and deploying code changes. HaalSamachar utilizes CI/CD practices to ensure smooth development and deployment workflows. Here's a brief overview:

1. **Continuous Integration (CI):** Automated testing is performed upon each code commit to the repository. This ensures that any changes made do not introduce regressions or errors into the codebase.*(WIP)*

2. **Continuous Deployment (CD):** Once the code changes pass the tests in the CI phase, they are automatically released to Docker hub and Github Packages. Check `/.github/workflows` for the github actions yaml files.

## DEPLOYMENT LINKS:

1. **GraphQL Server (Golang + gqlgen):** [https://graphql-pstx.onrender.com](https://graphql-pstx.onrender.com)

2. **USERS REST API (Golang + Gin):** [https://haalsamachar-users.onrender.com](https://haalsamachar-users.onrender.com)

3. **BLOGS REST API (Golang + Gin):** [https://haalsamachar-blogs.onrender.com](https://haalsamachar-blogs.onrender.com)

4. **COMMENTS REST API (Golang + Gin):** [https://haalsamachar-comments.onrender.com](https://haalsamachar-comments.onrender.com)

5. **AUTH REST API (Golang + Gin):** Not Deployed as we currently use firebase auth for secure authentication.

6. **Frontend (Typescript + Next.js):** [https://haal-samachar.vercel.app/](https://haal-samachar.vercel.app/)

7. **Database (PostgreSQL):** [Not applicable for direct access]


## Getting Started Using Docker

To get started with this application, follow these steps:

1. **Clone the Repository**: Clone the repository to your local machine.
   
2. **Install Dependencies**: Ensure Docker and Docker Compose are installed on your system.

3. **Configure Environment Variables**: Create a `.env` file in the project root directory and set the required environment variables for each service.

4. **Run the Application**: Use Docker Compose to build and start the services:
   ```bash
   docker-compose up
   ```
   This command will build and start all services defined in the `docker-compose.yml` file.

5. **Access the Application**: Once the services are running, access the blog website through your web browser at respective localhost ports [ 8081 , 8082 , 8083 , 8084 , 3000 , 4000 ].

Alternatively, you can build specific Docker images for various services using the command:

```bash
docker build -t haalsamachar-graphql ./Dockerfile.graph
```
```bash
docker build -t haalsamachar-users ./Dockerfile.users
```
```bash
docker build -t haalsamachar-blogs ./Dockerfile.blogs
```
```bash
docker build -t haalsamachar-auth ./Dockerfile.auth
```
```bash
docker build -t haalsamachar-comments ./Dockerfile.comments
```
```bash
docker build -t haalsamachar-frontend ./Dockerfile.frontend
```

## Setting Up Kubernetes Cluster

The kubernetes deployment configuration yaml files are located in `/deployment` directory. These can be modified to scale the number of pods and other configurations as per requirements.

To deploy HaalSamachar using Kubernetes, follow these steps:

1. **Install Kubernetes:** Set up a Kubernetes cluster on your preferred cloud provider or locally using Minikube.
  
2. **Apply Manifests:** Use `kubectl apply /deployments` command to apply the Kubernetes manifests and deploy the HaalSamachar application to the Kubernetes cluster.

6. **Monitor and Scale:** Monitor the deployed application using Kubernetes monitoring tools and scale the application as needed to handle varying loads.

For detailed instructions on setting up the Kubernetes cluster and deploying HaalSamachar, refer to the documentation provided by your Kubernetes provider or the Kubernetes official documentation.


## API Documentation 

- [REST API DOCUMENTATION](RESTAPI)
- [GRAPHQL API DOCUMENTATION](GRAPHQL)


## Contributing

Contributions are welcome! If you have any ideas for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
