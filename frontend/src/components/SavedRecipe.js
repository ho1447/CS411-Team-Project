import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function SavedRecipe({ recipe, onRecipeClick }) {
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
              const docRef = doc(db, 'savedRecipes', `${recipe.id}`);
              deleteDoc(docRef);
            }}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
