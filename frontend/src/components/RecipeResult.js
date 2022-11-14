import React from "react"
import Recipe from './Recipe'

export default function RecipeResult({ recipeData }) {

    return (
        <main>
        <section className="recipes">
            {recipeData.results.map(recipe => {
            return <Recipe key={recipe.id} recipe={recipe}/>
            })}
        </section>
        </main>
    )
}