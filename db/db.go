// db/db.go

package db

import (
	"database/sql"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var db *sql.DB

func InitDB() *sql.DB {
	err := godotenv.Load()

	if err != nil {
		log.Println("Error loading .env file" + err.Error())
	}

	//Note: Uncomment this to access personal database
	// host := os.Getenv("DB_HOST")
	// port := os.Getenv("DB_PORT")
	// user := os.Getenv("DB_USER")
	// password := os.Getenv("DB_PASSWORD")
	// dbname := os.Getenv("DB_NAME")
	// connStr := "host=" + host + " port=" + port + " user=" + user + " password=" + password + " dbname=" + dbname + " sslmode=require"

	//Note: Uncomment this to access the production database
	connStr := os.Getenv("DATABASE_URL")

	db, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Error connecting to the database: ", err)
	}

	// Ping the database to check if the connection is successful
	err = db.Ping()
	if err != nil {
		log.Fatal("Error pinging the database: ", err)
	}

	log.Println("Successfully connected to the database")
	return db
}

func CloseDB() {
	if db != nil {
		db.Close()
	}
}
