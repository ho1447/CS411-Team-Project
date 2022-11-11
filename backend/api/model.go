package api

type Recipe struct {
	Id        int32   `json:"id"`
	Title     string  `json:"title"`
	Calories  float32 `json:"calories"`
	Carbs     string  `json:"carbs"`
	Fat       string  `json:"fat"`
	Image     string  `json:"image"`
	ImageType string  `json:"imageType"`
	Protein   string  `json:"protein"`
}

type RecipeSearchResp struct {
	Offset       int32    `json:"offset"`
	Number       int32    `json:"number"`
	Results      []Recipe `json:"results"`
	TotalResults int32    `json:"totalResults"`
}
