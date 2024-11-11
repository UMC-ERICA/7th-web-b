import { useState } from "react";
import styled from "styled-components";
import Card from "../components/card";

const SearchPage = () => {
  const [searchItemField, setSearchItemField] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchFieldChange = (event) => {
    setSearchItemField(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.includes(searchItemField.toLowerCase())
  );

  return (
    <StyledSearchPage>
      <StyledSearchBar
        value={searchItemField}
        onChange={handleSearchFieldChange}
      />
      <StyledSearchButton>검색</StyledSearchButton>
      <MovieList>
        {filteredMovies.map((movie) => (
          <Card movie={id} />
        ))}
      </MovieList>
      {searchItemField}
    </StyledSearchPage>
  );
};

export default SearchPage;

const StyledSearchPage = styled.div`
  display: flex;
  margin: 10px;
  width: 100%;
`;

const StyledSearchBar = styled.input`
  width: 90%;
  height: 50px;
  border-radius: 5px;
  font-size: 22px;
  padding: 0 10px;
`;
const StyledSearchButton = styled.button`
  width: 7.5%;
  border-radius: 5px;
  color: white;
  background-color: #f71161;
  font-size: 20px;
`;

const MovieItem = styled.div`
  font-size: 18px;
  margin: 5px 0; // Add some space between items
`;

const MovieList = styled.div`
  margin-top: 10px; // Add some space above the list
`;
