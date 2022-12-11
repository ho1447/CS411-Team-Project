import React, { useEffect, useState } from 'react';
import SavedRecipe from './SavedRecipe';
import { Typography } from '@mui/material';
import axios from 'axios';

const SavedRecipeDisplay = ({ onRecipeClick, token }) => {
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/getrecipes/${token}`)
      .then((res) => {
        console.log(res);
        setSavedRecipes(res.data);
      });
  }, []);

  const [savedRecipes, setSavedRecipes] = useState([]);

  return (
    <div>
      <Typography variant="h3">Saved Recipies</Typography>
      {savedRecipes &&
        savedRecipes.map((recipe) => {
          return <SavedRecipe recipe={recipe} onRecipeClick={onRecipeClick} />;
        })}
    </div>
  );
};

export default SavedRecipeDisplay;
