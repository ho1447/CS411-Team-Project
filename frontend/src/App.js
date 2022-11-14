import './App.css';
import React, {useEffect,  useState } from 'react';
import SearchBar from './components/SearchBar';

function App() {
  const CLIENT_ID = "d514fdeb916e4b7a8824afea3a00c48b"
  const REDIRECT_URI = "http://localhost:3000/"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [text, setText] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)

}, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }


  const onSearchSubmit = (searchValue) => {
    setText(searchValue);
  };

  return (
    <div className="App">
        <header className="App-header">
            <h1>Spotify React</h1>
            {!token ?
                //https://accounts.spotify.com/authorize?client_id=d514fdeb916e4b7a8824afea3a00c48b&response_type=token&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
                  Login to Spotify</a>
                : <button onClick={logout}>Logout</button>}
          
            {token ?
                <a>
                <div className="App">
                  <SearchBar onSearchSubmit={onSearchSubmit} />
                  <button
                    onClick={() => {
                      alert(text);
                    }}
                  >
                    Hello
                  </button>
                </div></a> : <h2></h2>
            }

        </header>
    </div>



  );
}

export default App;
