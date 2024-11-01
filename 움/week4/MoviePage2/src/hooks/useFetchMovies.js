import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchMovies = (endpoint) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${endpoint}`, {
        params: { api_key: 'de78f3589204f34063fb666ed535b7ca', language: 'ko-KR' },
      })
      .then(response => setMovies(response.data.results))
      .catch(error => console.error(error));
  }, [endpoint]);

  return movies;
};

export default useFetchMovies;
