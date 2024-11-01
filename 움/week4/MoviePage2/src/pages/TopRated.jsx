import React from 'react';
import useFetchMovies from '../hooks/useFetchMovies';
import MovieListPage from '../components/MovieListPage';

const TopRated = () => {
  const movies = useFetchMovies('top_rated');
  return <MovieListPage title="높은 평가를 받은 영화" movies={movies} />;
};

export default TopRated;
