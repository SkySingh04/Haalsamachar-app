package main

import (
	"blog/contracttesting/models"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"testing"

	"github.com/pact-foundation/pact-go/dsl"
)

func TestClientPact_Local(t *testing.T) {
	// initialize PACT DSL
	pact := dsl.Pact{
		Consumer: "example-client",
		Provider: "example-server",
	}

	// setup a PACT Mock Server
	pact.Setup(true)

	t.Run("get user by id", func(t *testing.T) {
		id := "2"

		pact.
			AddInteraction().                           // specify PACT interaction
			Given("User Alice exists").                 // specify Provider state
			UponReceiving("User 'Alice' is requested"). // specify test case name
			WithRequest(dsl.Request{                    // specify expected request
				Method: "GET",
				// specify matching for endpoint
				Path: dsl.Term("/users/1", "/users/[0-9]+"),
			}).
			WillRespondWith(dsl.Response{ // specify minimal expected response
				Status: 200,
				Body: dsl.Like(models.User{ // pecify matching for response body
					ID:       id,
					Username: "akash",
					Email:    "akash@gmail.com",
					Password: "",
				}),
			})

		// verify interaction on client side
		err := pact.Verify(func() error {
			// specify host anf post of PACT Mock Server as actual server
			host := fmt.Sprintf("%s:%d", pact.Host, pact.Server.Port)

			// execute function
			user, err := TestGetUserByID(host, id)
			if err != nil {
				return errors.New("error is not expected")
			}

			// check if actual user is equal to expected
			if user == nil || user.ID != id {
				return fmt.Errorf("expected user with ID %s but got %v", id, user)
			}

			return err
		})

		if err != nil {
			t.Fatal(err)
		}
	})

	// write Contract into file
	if err := pact.WritePact(); err != nil {
		t.Fatal(err)
	}

	// stop PACT mock server
	pact.Teardown()
}

func TestGetUserByID(host string, id string) (*models.User, error) {
	// create a new HTTP request
	req, err := http.NewRequest("GET", fmt.Sprintf("http://%s/users/%s", host, id), nil)
	if err != nil {
		return nil, err
	}

	// execute HTTP request
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// parse response body
	var user models.User
	if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
		return nil, err
	}

	return &user, nil
}
