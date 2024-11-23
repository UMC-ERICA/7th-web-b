import React from 'react';
import useFetchMovies from '../hooks/useFetchMovies';
import MovieListPage from '../components/MovieListPage';

const NowPlaying = () => {
  const movies = useFetchMovies('now_playing');
  console.log("Movies data in NowPlaying:", movies); 
  return <MovieListPage title="현재 상영중인 영화" movies={movies} />;
};

export default NowPlaying;