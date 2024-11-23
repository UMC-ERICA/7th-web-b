// useFetchMovies.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchMovies = (endpoint) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${endpoint}`, {
          params: { api_key: 'de78f3589204f34063fb666ed535b7ca', language: 'ko-KR' },
        });
        console.log("Fetched movies:", response.data.results); // 데이터 확인
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [endpoint]);

  return movies;
};

export default useFetchMovies;



// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const useFetchMovies = (endpoint) => {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`https://api.themoviedb.org/3/movie/${endpoint}`, {
//         params: { api_key: 'de78f3589204f34063fb666ed535b7ca', language: 'ko-KR' },
//       })
//       .then(response => setMovies(response.data.results))
//       .catch(error => console.error(error));
//   }, [endpoint]);

//   return movies;
// };

// export default useFetchMovies;
