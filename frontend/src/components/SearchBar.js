import React, { useRef } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const SearchBar = (props) => {
  const searchBarRef = useRef('');
  const [responseData, setResponseData] = React.useState('')

  // fetch recipes based on parameters
  const fetchData = (query) => {
    fetch("http://localhost:8080/api/v1/recipes", {
      method: "GET",
      'params': {
        'query':query,
      },
    })
    .then((response) => response.json())
    .then((response)=>{
        setResponseData(response.results)
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
          event.preventDefault();
          props.onSearchSubmit(searchBarRef.current.value);
          fetchData(searchBarRef.current.value);
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

      {/* map search results */}
      {responseData && responseData.results?.map(data => (
        <Card>
          <CardContent>
            <Typography color="text.secondary">Recipe</Typography>
            <Typography variant="h5">{data.title}</Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default SearchBar;
