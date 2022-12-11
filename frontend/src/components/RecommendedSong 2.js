import React from 'react';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';

const RecommendedSong = ({ title, artist, imageURL, songURL }) => {
  return (
    <a style={{ textDecoration: 'none' }} href={songURL}>
      <Card sx={{ marginBottom: '2%' }}>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <img
            style={{ width: '5%', height: '5%' }}
            src={imageURL}
            alt="loading"
          />
          <Typography variant="h5">{title}</Typography>
          <Typography variant="p">by: {artist}</Typography>
        </CardContent>
      </Card>
    </a>
  );
};

export default RecommendedSong;
