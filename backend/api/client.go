package api

import (
	"CS411-Team-Project/backend/db"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Client struct {
	apiKey string
	db     *mongo.Client
}

// NewAPIClient returns a new client for invoking the API with provided key
func NewClient(apiKey string) *Client {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	println("Connected to MongoDB")
	return &Client{apiKey: apiKey, db: client}
}

func (client *Client) SearchRecipes(q string) *RecipeSearchResp {
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

func (client *Client) GetRecipeInfo(id string) *RecipeInfo {
	url := fmt.Sprintf("https://api.spoonacular.com/recipes/%s/information", id) // API endpoint
	httpClient := http.Client{}
	req, err := http.NewRequest("GET", url, nil) // create GET request
	if err != nil {
		panic(err)
	}
	req.Header.Add("x-api-key", client.apiKey)

	resp, err := httpClient.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}
	output := &RecipeInfo{}
	err = json.Unmarshal(body, output)
	if err != nil {
		panic(err)
	}
	return output
}

func (client *Client) SaveUserRecipe(userID, recipeID string) (RespMessage, error) {
	coll := client.db.Database("cs411db").Collection("savedrecipes")
	newSaveEntry := db.UserRecipePair{UserID: userID, RecipeID: recipeID}
	_, err := coll.InsertOne(context.TODO(), newSaveEntry)
	if err != nil {
		return RespMessage{Message: "Error saving recipe"}, err
	}
	return RespMessage{Message: "Recipe saved!"}, nil
}

func (client *Client) RemoveSavedRecipe(userID, recipeID string) (RespMessage, error) {
	coll := client.db.Database("cs411db").Collection("savedrecipes")
	filter := bson.D{{"userID", userID}, {"recipeID", recipeID}}
	_, err := coll.DeleteOne(context.TODO(), filter)
	if err != nil {
		return RespMessage{Message: "Error removing saved recipe"}, err
	}
	return RespMessage{Message: "Recipe unsaved!"}, nil
}

func (client *Client) GetUserSavedRecipes(userID string) *SavedRecipeResp {
	coll := client.db.Database("cs411db").Collection("savedrecipes")
	filter := bson.D{{"userID", userID}}
	cursor, err := coll.Find(context.TODO(), filter)
	if err != nil {
		panic(err)
	}
	var results []bson.M
	if err = cursor.All(context.TODO(), &results); err != nil {
		log.Fatal(err)
	}
	output := SavedRecipeResp{}
	for _, result := range results {
		id := fmt.Sprintf("%v", result["recipeID"])
		recipeInfo := client.GetRecipeInfo(id)
		recipe := RecipeMinimal{Id: recipeInfo.Id, Title: recipeInfo.Title, Image: recipeInfo.Image, Summary: recipeInfo.Summary}
		output.Results = append(output.Results, recipe)
	}
	return &output
}
