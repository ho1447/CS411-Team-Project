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

type RecipeMinimal struct {
	Id      int32  `json:"id"`
	Title   string `json:"title"`
	Image   string `json:"image"`
	Summary string `json:"summary"`
}

type RecipeSearchResp struct {
	Offset       int32    `json:"offset"`
	Number       int32    `json:"number"`
	Results      []Recipe `json:"results"`
	TotalResults int32    `json:"totalResults"`
}

type RespMessage struct {
	Message string `json:"message"`
}

type SavedRecipeResp struct {
	Results []RecipeMinimal
}

type RecipeInfo struct {
	Id                       int32                    `json:"id"`
	Title                    string                   `json:"title"`
	Image                    string                   `json:"image"`
	ImageType                string                   `json:"imageType"`
	Servings                 float32                  `json:"servings"`
	ReadyInMinutes           int32                    `json:"readyInMinutes"`
	License                  string                   `json:"license"`
	SourceName               string                   `json:"sourceName"`
	SourceUrl                string                   `json:"sourceUrl"`
	SpoonacularSourceUrl     string                   `json:"spoonacularSourceUrl"`
	AggregateLikes           int32                    `json:"aggregateLikes"`
	HealthScore              float32                  `json:"healthScore"`
	SpoonacularScore         float32                  `json:"spoonacularScore"`
	PricePerServing          float32                  `json:"pricePerServing"`
	AnalyzedInstructions     []map[string]interface{} `json:"analyzedInstructions"`
	Cheap                    bool                     `json:"cheap"`
	CreditsText              string                   `json:"creditsText"`
	Cuisines                 []string                 `json:"cuisines"`
	DairyFree                bool                     `json:"dairyFree"`
	Diets                    []string                 `json:"diets"`
	Gaps                     string                   `json:"gaps"`
	GlutenFree               bool                     `json:"glutenFree"`
	Instructions             string                   `json:"instructions"`
	Ketogenic                bool                     `json:"ketogenic"`
	LowFodmap                bool                     `json:"lowFodmap"`
	Occasions                []string                 `json:"occasions"`
	Sustainable              bool                     `json:"sustainable"`
	Vegan                    bool                     `json:"vegan"`
	Vegetarian               bool                     `json:"vegetarian"`
	VeryHealthy              bool                     `json:"veryHealthy"`
	VeryPopular              bool                     `json:"veryPopular"`
	Whole30                  bool                     `json:"whole30"`
	WeightWatcherSmartPoints float32                  `json:"weightWatcherSmartPoints"`
	DishTypes                []string                 `json:"dishTypes"`
	ExtendedIngredients      []ExtendedIngredients    `json:"extendedIngredients"`
	Summary                  string                   `json:"summary"`
	WinePairing              WinePairing              `json:"winePairing"`
}

type ExtendedIngredients struct {
	Aisle        string    `json:"aisle"`
	Amount       float32   `json:"amount"`
	Consitency   string    `json:"consitency"`
	Id           int32     `json:"id"`
	Image        string    `json:"image"`
	Measures     *Measures `json:"measures,omitempty"`
	Meta         []string  `json:"meta,omitempty"`
	Name         string    `json:"name"`
	Original     string    `json:"original"`
	OriginalName string    `json:"originalName"`
	Unit         string    `json:"unit"`
}

type Measures struct {
	Metric Metric `json:"metric"`
	Us     Metric `json:"us"`
}

type Metric struct {
	Amount    float32 `json:"amount"`
	UnitLong  string  `json:"unitLong"`
	UnitShort string  `json:"unitShort"`
}

type Us struct {
}

type WinePairing struct {
	PairedWines    []string       `json:"pairedWines"`
	PairingText    string         `json:"pairingText"`
	ProductMatches []ProductMatch `json:"productMatches"`
}

type ProductMatch struct {
	Id            int32   `json:"id"`
	Title         string  `json:"title"`
	Description   string  `json:"description"`
	Price         string  `json:"price"`
	ImageUrl      string  `json:"imageUrl"`
	AverageRating float32 `json:"averageRating"`
	RatingCount   float32 `json:"ratingCount"`
	Score         float32 `json:"score"`
	Link          string  `json:"link"`
}
