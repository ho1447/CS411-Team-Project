package api

import (
	"encoding/json"
	"io"
	"net/http"
)

type Client struct {
	apiKey string
}

// NewAPIClient returns a new client for invoking the API with provided key
func NewClient(apiKey string) *Client {
	return &Client{apiKey: apiKey}
}

func (client *Client) SearchRecipe(q string) *RecipeSearchResp {
	url := "https://api.spoonacular.com/recipes/complexSearch" // API endpoint
	httpClient := http.Client{}
	req, err := http.NewRequest("GET", url, nil) // create GET request
	if err != nil {
		panic(err)
	}
	req.Header.Add("x-api-key", client.apiKey)

	query := req.URL.Query()
	query.Add("query", q)
	req.URL.RawQuery = query.Encode()

	resp, err := httpClient.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}
	output := &RecipeSearchResp{}
	err = json.Unmarshal(body, output)
	if err != nil {
		panic(err)
	}
	return output
}
