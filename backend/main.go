package main

import (
	docs "CS411-Team-Project/backend/docs"
	"CS411-Team-Project/backend/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title       CS411 API
// @version     1.0
// @description API for the team's project.

// @BasePath /api/v1

func main() {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
	}))
	docs.SwaggerInfo.BasePath = "/api/v1"

	v1 := router.Group("/api/v1")
	{
		v1.GET("/recipes", handlers.SearchRecipes)
		v1.GET("/recipe/:id", handlers.GetRecipeInfo)
	}
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
	router.Run(":8080")
}
