import './App.css';
import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import RecipeModal from './components/RecipeModal';
import SavedRecipeDisplay from './components/SavedRecipeDisplay';
import RecommendedSongsDisplay from './components/RecommendedSongsDisplay';
import axios from 'axios';
import './App.css';
import { Typography } from '@mui/material';

function App() {
  const CLIENT_ID = 'd514fdeb916e4b7a8824afea3a00c48b';
  const REDIRECT_URI = 'http://localhost:3000/';
  const AUTH_ENDPOINT = 'http://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';

  const [text, setText] = useState('');
  const [token, setToken] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [recommendedSongList, setRecommendedSongList] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');

    if (!token && hash) {
      token = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        .split('=')[1];

      window.location.hash = '';
      window.localStorage.setItem('token', token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
  };

  const onSearchSubmit = (searchValue) => {
    setText(searchValue);
    axios
      .get(`https://api.spotify.com/v1/search?q=${searchValue}&type=track`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const songList = res.data.tracks.items;
        console.log(songList);
        const recommended = [];
        songList.forEach((song) => {
          let artistString = '';
          song.artists.forEach(({ name }) => {
            artistString += name + ', ';
          });
          artistString = artistString.slice(0, -2);
          recommended.push({
            title: song.name,
            artist: artistString,
            imageURL: song.album.images[0].url,
            songURL: song.external_urls.spotify,
          });
        });
        console.log(recommended);
        setRecommendedSongList(recommended);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRecipeClick = (recipeInfo) => {
    axios
      .get(`http://localhost:8080/api/v1/recipe/${recipeInfo.id}`)
      .then((res) => {
        setCurrentRecipe({
          recipeID: recipeInfo.id,
          title: res.data.title,
          linkToImage: res.data.image,
          summary: res.data.summary,
        });
      });
    setOpenModal(true);
  };

  function useForceUpdate() {
    return setValue((value) => value + 1);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Spotify React</h1>
        {!token ? (
          //https://accounts.spotify.com/authorize?client_id=d514fdeb916e4b7a8824afea3a00c48b&response_type=token&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </header>
      {token && (
        <div className="container">
          <div className="search-bar-container">
            <Typography variant="h3">Search:</Typography>
            <SearchBar
              onSearchSubmit={onSearchSubmit}
              onRecipeClick={onRecipeClick}
            />
          </div>
          <RecipeModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            currentRecipe={currentRecipe}
            setCurrentRecipe={setCurrentRecipe}
            token={token}
            updateSaved={useForceUpdate}
          />
          <div className="divider" />
          <div className="saved-recipe-container">
            <SavedRecipeDisplay onRecipeClick={onRecipeClick} token={token} />
          </div>
          <div className="divider" />
          <div className="recommended-songs-container">
            <Typography variant="h3">Recommended Songs</Typography>
            <RecommendedSongsDisplay songs={recommendedSongList} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
