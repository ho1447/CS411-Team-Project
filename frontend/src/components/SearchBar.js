import React, { useRef } from 'react';

const SearchBar = (props) => {
  const searchBarRef = useRef('');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSearchSubmit(searchBarRef.current.value);
        searchBarRef.current.value = '';
      }}
    >
      <input
        type="text"
        className="search-bar"
        id="search-bar"
        ref={searchBarRef}
        placeholder="Enter the recipe"
      />
      <input type="submit" placeholder="Submit" />
    </form>
  );
};

export default SearchBar;
