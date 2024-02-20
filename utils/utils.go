package utils

import (
	"crypto/sha256"
	"encoding/hex"
	"time"

	"github.com/dgrijalva/jwt-go"
)

func HashPassword(password string) string {
	hasher := sha256.New()
	hasher.Write([]byte(password))
	return hex.EncodeToString(hasher.Sum(nil))
}

var jwtKey = []byte("ohIlikeToBeBesideTheSeaside")

func GenerateToken(username string) (string, error) {
	// Create a new JWT token
	token := jwt.New(jwt.SigningMethodHS256)

	// Set claims
	claims := token.Claims.(jwt.MapClaims)
	claims["username"] = username
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix() // Token expires in 24 hours

	// Generate encoded token
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

// ValidateToken validates the given JWT token and returns the claims if valid
func ValidateToken(tokenString string) (jwt.MapClaims, error) {
	// Parse the token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Check the signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}
		return jwtKey, nil
	})
	if err != nil {
		return nil, err
	}

	// Validate the token
	if !token.Valid {
		return nil, jwt.ErrInvalidKey
	}

	// Extract claims
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, jwt.ErrInvalidKey
	}

	return claims, nil
}
