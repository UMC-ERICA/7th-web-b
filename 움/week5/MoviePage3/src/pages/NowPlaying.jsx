import React from 'react';
import useFetchMovies from '../hooks/useFetchMovies';
import MovieListPage from '../components/MovieListPage';

const NowPlaying = () => {
  const movies = useFetchMovies('now_playing');
  console.log("Movies data in NowPlaying:", movies); 
  return <MovieListPage title="현재 상영중인 영화" movies={movies} />;
};

export default NowPlaying;






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import MovieCard from '../components/MovieCard';

// const NowPlaying = () => {
//     const [movies, setMovies] = useState([]);

//     useEffect(() => {
//         axios
//             .get('https://api.themoviedb.org/3/movie/now_playing', {
//                 params: { api_key: 'de78f3589204f34063fb666ed535b7ca', language: 'ko-KR' },
//             })
//             .then(response => setMovies(response.data.results))
//             .catch(error => console.error(error));
//     }, []);

//     return (
//         <div>
//             <h2>현재 상영중인 영화</h2>
//             {movies.map(movie => (
//                 <MovieCard
//                     key={movie.id}
//                     title={movie.title}
//                     releaseDate={movie.release_date}
//                     posterPath={movie.poster_path} // 포스터 경로를 전달
//                 />
//             ))}
//         </div>
//     );
// };

// export default NowPlaying;
