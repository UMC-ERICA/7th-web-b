import React from 'react';
import useFetchMovies from '../hooks/useFetchMovies';
import MovieListPage from '../components/MovieListPage';

const Popular = () => {
  const movies = useFetchMovies('popular');
  return <MovieListPage title="인기 영화" movies={movies} />;
};

export default Popular;
