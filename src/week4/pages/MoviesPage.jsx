import Card from "../components/card.jsx";
import { useEffect, useState } from "react";
import * as S from "../movies.style.js";
import axios from "axios";

const MoviesPage = ({ query }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_TMDB_API_URL}/${query}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=ko-KR&page=1`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    getMovies();
  }, [query]);

  return (
    <>
      <S.CardList>
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </S.CardList>
    </>
  );
};

export default MoviesPage;
