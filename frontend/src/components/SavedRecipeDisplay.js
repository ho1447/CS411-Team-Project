import React, { useEffect, useState } from 'react';
import { db, colRef } from '../firebase-config';
import { getDocs } from 'firebase/firestore';
import SavedRecipe from './SavedRecipe';
import { Typography } from '@mui/material';

const SavedRecipeDisplay = ({ onRecipeClick }) => {
  useEffect(() => {
    getDocs(colRef).then((res) => {
      const saved = [];
      res.docs.forEach((doc) => {
        saved.push({ id: doc.id, ...doc.data() });
      });
      setSavedRecipes(saved);
    });
  }, []);

  const [savedRecipes, setSavedRecipes] = useState([]);

  return (
    <div>
      <Typography variant="h1">Saved Recipies</Typography>
      {savedRecipes.map((recipe) => {
        return <SavedRecipe recipe={recipe} onRecipeClick={onRecipeClick} />;
      })}
    </div>
  );
};

export default SavedRecipeDisplay;
