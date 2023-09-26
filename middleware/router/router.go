package router

app := fiber.New()

// ...

app.Post("/login", loginHandler)
app.Post("/logout", logoutHandler)

// ...

app.Listen(":8080")
