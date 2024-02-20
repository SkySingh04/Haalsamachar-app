package main

import (
	"blog/contracttesting/db"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	db.InitDB()
	defer db.CloseDB()

	db.CreateUsersTable()

	// Define routes
	r.POST("/api/auth/login", loginHandler)
	r.GET("/api/auth/verify", verifyHandler)
	r.POST("/api/auth/refresh", refreshTokenHandler)

	// Run server
	r.Run(":8084")
}
