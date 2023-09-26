package middleware

import (
	"net/http"

	"github.com/gofiber/fiber"
)

func loginHandler(context *fiber.Ctx) error {
	// Get user credentials from the request (e.g., username and password)
	username := context.FormValue("username")
	password := context.FormValue("password")

	// Authenticate the user using Clerk's login method
	user, err := client.Users().Login(username, password)
	if err != nil {
		// Handle login failure (e.g., invalid credentials)
		return context.Status(http.StatusUnauthorized).JSON(fiber.Map{
			"error": "Authentication failed",
		})
	}

	// User is authenticated, you can store user information in the session or generate a token
	// ...

	return context.Status(http.StatusOK).JSON(fiber.Map{
		"message": "Login successful",
		"user":    user,
	})
}

func logoutHandler(context *fiber.Ctx) error {
	// Perform user logout actions (e.g., clear session or token)
	// ...

	return context.Status(http.StatusOK).JSON(fiber.Map{
		"message": "Logout successful",
	})
}
