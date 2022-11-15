import { Card, CardContent, Typography } from '@mui/material';

export default function Recipe({ recipe, onRecipeClick }) {
  return (
    <Card
      onClick={() => {
        onRecipeClick(recipe);
      }}
    >
      <CardContent>
        <Typography variant="h5">{recipe.title}</Typography>
      </CardContent>
    </Card>
  );
}
