package handlers

import (
	"CS411-Team-Project/backend/api"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

// @Summary     Search recipes
// @Description Search recipe based on given query. Example /recipe?query=italian
// @Param       query query string true "Recipe search by natural language query i.e 'italian with egg'"
// @Produce     json
// @Success     200 {object} api.RecipeSearchResp
// @Failure     500  {object}  api.RespMessage
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
// @Failure     500  {object}  api.RespMessage
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

// @Summary     Save user's saved recipe
// @Description Saves recipe based on userID and recipeID to MongoDB
// @Param       userID path string true "userID"
// @Param		recipeID path string true "recipeID"
// @Success     200 {object} api.RespMessage
// @Failure     500  {object}  api.RespMessage
// @Router      /save/{userID}/{recipeID} [post]
func RecipesSave(ctx *gin.Context) {
	client := api.NewClient(os.Getenv("RECIPE_API_KEY")) // get API key fron env var
	userID := ctx.Param("userID")
	recipeID := ctx.Param("recipeID")
	output, err := client.SaveUserRecipe(userID, recipeID)
	b, berr := json.Marshal(output)
	if berr != nil {
		fmt.Println(berr)
		ctx.JSON(http.StatusInternalServerError, "")
	}
	if err != nil {
		log.Println(err)
		ctx.Data(http.StatusInternalServerError, gin.MIMEJSON, b)
	}
	ctx.Data(http.StatusOK, gin.MIMEJSON, b)
}

// @Summary     Get saved recipes based on userID
// @Description Get saved recipes based on userID from MongoDB
// @Produce     json
// @Param       userID path string true "userID"
// @Success     200 {object} api.SavedRecipeResp.Results
// @Failure     500  {object}  api.RespMessage
// @Router      /getrecipes/{userID} [get]
func GetSavedRecipes(ctx *gin.Context) {
	client := api.NewClient(os.Getenv("RECIPE_API_KEY")) // get API key fron env var
	userID := ctx.Param("userID")
	output := client.GetUserSavedRecipes(userID)
	b, err := json.Marshal(output.Results)
	if err != nil {
		log.Println(err)
		ctx.JSON(http.StatusInternalServerError, "")
	}
	ctx.Data(http.StatusOK, gin.MIMEJSON, b)
}
