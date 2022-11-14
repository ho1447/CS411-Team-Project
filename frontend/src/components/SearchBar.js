import React, { useRef } from 'react';
import RecipeResult from './RecipeResult';

const SearchBar = (props) => {
  const searchBarRef = useRef('');
  const [responseData, setResponseData] = React.useState('')
  const [queryText, setQueryText] = React.useState('')

  // fetch recipes based on parameters
  const fetchData = () => {
    fetch("http://localhost:8080/api/v1/recipes?query=" + queryText, {
      method: "GET",
    })
    .then((response) => response.json())
    .then((response)=>{
        setResponseData(response)
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })
  }

  return (
    <>
      <form
        onSubmit={(event) => {
          fetchData();
          event.preventDefault();
          props.onSearchSubmit(searchBarRef.current.value);
          searchBarRef.current.value = '';
        }}
      >
        <input
          type="text"
          className="search-bar"
          id="search_bar"
          ref={searchBarRef}
          onChange={event => setQueryText(event.target.value)}
          placeholder="Enter the recipe"
        />
        <input type="submit" placeholder="Submit" />
      </form>

      {/* map search results */}
      {responseData && <RecipeResult recipeData={responseData}/>}
    </>
  );
};

export default SearchBar;
