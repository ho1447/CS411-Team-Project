import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import axios from 'axios';

export default function SavedRecipe({ recipe, onRecipeClick, token, update }) {
  return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5">{recipe.title}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Button
            variant="contained"
            onClick={() => {
              onRecipeClick(recipe);
            }}
          >
            Open
          </Button>
          <Button
            sx={{ backgroundColor: 'red' }}
            variant="contained"
            onClick={() => {
              axios.post(
                `http://localhost:8080/api/v1/save/remove/${token}/${recipe.id}`
              );
              update();
            }}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
