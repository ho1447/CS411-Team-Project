import { Card, CardContent, Typography } from '@mui/material';

export default function Recipe({ recipe }) {
  return (
    <Card>
        <CardContent>
            <Typography variant="h5">{recipe.title}</Typography>
        </CardContent>
    </Card>
  )
}