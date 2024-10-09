import Card from "../components/card.jsx";
import { useEffect, useState } from "react";
import * as S from "../movies.style.js";

const MoviesPage = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      let endpoint = "discover/movie";

      if (query === "now_playing") endpoint = "movie/now_playing";
      if (query === "popular") endpoint = "movie/popular";
      if (query === "top_rated") endpoint = "movie/top_rated";
      if (query === "upcoming") endpoint = "movie/upcoming";

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjY4NGY5MzkwYTU4NDNhNGU3NDI3OWM2OGVjNWI0MCIsIm5iZiI6MTcyODQ0MDM1Ni40NzU0NjksInN1YiI6IjY2ZmZhYmU0NzgzMGMxMzAxZTdjYjBmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h0VgmnKXQWyR5yPzBLbzFuiR9wTML-kvpl2p1TJyStc`, // Bearer 토큰 사용
        },
      };

      try {
        const response = await fetch(`https://api.themoviedb.org/3/${endpoint}?language=ko-KR&page=1`, options);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (err) {
        setError(err.message);
      }
    };

    getMovies();
  }, [query]);

  return (
    <>
      {error && <p>Error: {error}</p>}
      <S.CardList>
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </S.CardList>
    </>
  );
};

export default MoviesPage;