# Use an official Go runtime as the base image
FROM golang:1.17-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the code into the container
COPY . .

# Build the Go binary
RUN go build -o blog-service .

# Use a smaller base image for the final container
FROM alpine:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the binary from the build stage to the final container
COPY --from=build /app/blog-service .

# Expose the port the service listens on
EXPOSE 8082

# Command to run the service
CMD ["./blog-service"]
