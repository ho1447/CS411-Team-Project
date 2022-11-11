import './App.css';
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';

function App() {
  const [text, setText] = useState('');

  const onSearchSubmit = (searchValue) => {
    setText(searchValue);
  };

  return (
    <div className="App">
      <SearchBar onSearchSubmit={onSearchSubmit} />
      <button
        onClick={() => {
          alert(text);
        }}
      >
        Hello
      </button>
    </div>
  );
}

export default App;
