package main

import (
	"blog/contracttesting/db"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	// Configure CORS middleware
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"https://haal-samachar.vercel.app/"} // Add your frontend origin here
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	r.Use(cors.New(config))
	db.InitDB()
	defer db.CloseDB()

	db.CreateUsersTable()

	// Define routes

	r.GET("/", healthCheckHandler)
	r.POST("/api/auth/login", loginHandler)
	r.GET("/api/auth/verify", verifyHandler)
	r.POST("/api/auth/refresh", refreshTokenHandler)

	// Run server
	r.Run(":8084")
}
