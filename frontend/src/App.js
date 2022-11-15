import './App.css';
import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import { Typography, Modal, Box } from '@mui/material';
import axios from 'axios';

function App() {
  const CLIENT_ID = 'd514fdeb916e4b7a8824afea3a00c48b';
  const REDIRECT_URI = 'http://localhost:3000/';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';

  const [text, setText] = useState('');
  const [token, setToken] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({});

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
  };

  const onRecipeClick = (recipeInfo) => {
    axios
      .get(`http://localhost:8080/api/v1/recipe/${recipeInfo.id}`)
      .then((res) => {
        setCurrentRecipe({
          title: res.data.title,
          linkToImage: res.data.image,
          summary: res.data.summary,
        });
      });

    setOpenModal(true);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>
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

        {token ? (
          <div className="App">
            <SearchBar
              onSearchSubmit={onSearchSubmit}
              onRecipeClick={onRecipeClick}
            />
            <button
              onClick={() => {
                alert(text);
              }}
            >
              Hello
            </button>

            <Modal
              open={openModal}
              onClose={() => {
                setOpenModal(false);
                setCurrentRecipe({});
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {currentRecipe.title}
                </Typography>
                <img src={currentRecipe.linkToImage} alt="oops" />
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {currentRecipe.summary}
                </Typography>
              </Box>
            </Modal>
          </div>
        ) : (
          <h2></h2>
        )}
      </header>
    </div>
  );
}

export default App;
