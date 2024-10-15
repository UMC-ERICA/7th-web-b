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
          `https://api.themoviedb.org/3/movie/${query}?language=ko-KR&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            },
          }
        );
        console.log(response.data.results); // 데이터를 확인하는 로그 추가
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
