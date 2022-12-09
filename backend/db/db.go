package db

type UserRecipePair struct {
	UserID   string `bson:"userID,omitempty"`
	RecipeID string `bson:"recipeID,omitempty"`
}
