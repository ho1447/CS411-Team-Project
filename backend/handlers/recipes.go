package handlers

import (
	"CS411-Team-Project/backend/api"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

// @Summary     Search recipes
// @Description Search recipe based on given query. Example /recipe?query=italian
// @Param       query query string true "Recipe search by natural language query i.e 'italian with egg'"
// @Produce     json
// @Success     200 {object} api.RecipeSearchResp
// @Router      /recipes [get]
func SearchRecipes(ctx *gin.Context) {
	client := api.NewClient(os.Getenv("RECIPE_API_KEY")) // get API key fron env var
	query := ctx.Query("query")
	output := client.SearchRecipes(query)
	b, err := json.Marshal(output)
	if err != nil {
		fmt.Println(err)
		ctx.JSON(http.StatusInternalServerError, "")
	}
	ctx.Data(http.StatusOK, gin.MIMEJSON, b)
}

// @Summary     Get recipe information
// @Description Get recipe information based on given recipe id
// @Produce     json
// @Param       id  path     int true "Recipe ID"
// @Success     200 {object} api.RecipeInfo
// @Router      /recipe/{id} [get]
func GetRecipeInfo(ctx *gin.Context) {
	client := api.NewClient(os.Getenv("RECIPE_API_KEY")) // get API key fron env var
	id := ctx.Param("id")
	output := client.GetRecipeInfo(id)
	b, err := json.Marshal(output)
	if err != nil {
		fmt.Println(err)
		ctx.JSON(http.StatusInternalServerError, "")
	}
	ctx.Data(http.StatusOK, gin.MIMEJSON, b)
}

// @Summary     Save recipe information to mongodb database
// @Description Saves recipe based on userID and recipeID
// @Param       userID path string true "userID"
// @Param		recipeID path string true "recipeID"
// @Router      /save/{userID}/{recipeID} [get]
func RecipesSave(ctx *gin.Context) {
	client := api.NewClient(os.Getenv("RECIPE_API_KEY")) // get API key fron env var
	userID := ctx.Param("userID")
	recipeID := ctx.Param("recipeID")
	err := client.SaveUserRecipe(userID, recipeID)
	if err != nil {
		fmt.Println(err)
		ctx.JSON(http.StatusInternalServerError, "")
	}
	ctx.JSON(http.StatusOK, "")
}

// @Summary     Get saved recipe data from mongodb database
// @Description Get recipes based on userID
// @Produce     json
// @Param       userID path string true "userID"
// @Router      /getrecipes/{userID} [get]
func GetSavedRecipes(ctx *gin.Context) {
	client := api.NewClient(os.Getenv("RECIPE_API_KEY")) // get API key fron env var
	userID := ctx.Param("userID")
	client.GetUserSavedRecipes(userID)
	ctx.JSON(http.StatusOK, "")
}
