import React from 'react';
import Recipe from './Recipe';

export default function RecipeResult({ recipeData, onRecipeClick }) {
  return (
    <main>
      <section className="recipes">
        {recipeData.results.map((recipe) => {
          return (
            <Recipe
              key={recipe.id}
              recipe={recipe}
              onRecipeClick={onRecipeClick}
            />
          );
        })}
      </section>
    </main>
  );
}
