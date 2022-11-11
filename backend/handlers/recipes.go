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
