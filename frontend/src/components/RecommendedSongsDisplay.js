import React from 'react';
import RecommendedSong from './RecommendedSong';

const RecommendedSongsDisplay = ({ songs }) => {
  return songs.map((song) => {
    return (
      <RecommendedSong
        title={song.title}
        artist={song.artist}
        imageURL={song.imageURL}
        songURL={song.songURL}
      />
    );
  });
};

export default RecommendedSongsDisplay;
