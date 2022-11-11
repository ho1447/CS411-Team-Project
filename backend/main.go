package main

import (
	"CS411-Team-Project/backend/api"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	docs "CS411-Team-Project/backend/docs"

	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title CS411 API
// @version 1.0
// @description API for the team's project.

// @BasePath /api/v1

// @Summary Search recipe
// @Description Search recipe based on given query. Example /recipe?query=italian
// @Param        query    query     string  true  "Recipe search by natural language query i.e 'italian with egg'"
// @Produce json
// @Success 200 {object} api.RecipeSearchResp
// @Router /recipe [get]
func SearchRecipe(ctx *gin.Context) {
	client := api.NewClient(os.Getenv("RECIPE_API_KEY")) // get API key fron env var
	query := ctx.Query("query")
	output := client.SearchRecipe(query)
	b, err := json.Marshal(output)
	if err != nil {
		fmt.Println(err)
		ctx.JSON(http.StatusInternalServerError, "")
	}
	ctx.Data(http.StatusOK, gin.MIMEJSON, b)
}

func main() {
	router := gin.Default()
	docs.SwaggerInfo.BasePath = "/api/v1"

	v1 := router.Group("/api/v1")
	{
		v1.GET("/recipe", SearchRecipe)
	}
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
	router.Run(":8080")
}
