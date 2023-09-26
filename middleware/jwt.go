package middleware

import (
	"net/http"

	"github.com/clerkinc/clerk-sdk-go/clerk"
)

func main() {

	mux := http.NewServeMux()
	injectActiveSession := clerk.WithSessionV2(client)
	mux.Handle("/your-endpoint", injectActiveSession(yourEndpointHandler))

}
func yourEndpointHandler(w http.ResponseWriter, r *http.Request) {
	// Retrieve the active session from the request's context
	session, err := clerk.SessionFromContext(r.Context())
	if err != nil {
		// Session not found or invalid, handle accordingly
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Check session data to authenticate and authorize the user
	if !session.IsAuthenticated() {
		// User is not authenticated, handle accordingly
		http.Error(w, "Authentication required", http.StatusUnauthorized)
		return
	}

	// User is authenticated, proceed with your logic
	// session.GetUserID() can be used to get the user's ID
	// session.GetRoles() can be used to get the user's roles

	// Your application logic here
}
