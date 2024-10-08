import React from 'react';
import useFetchMovies from '../hooks/useFetchMovies';
import MovieListPage from '../components/MovieListPage';

const Upcoming = () => {
  const movies = useFetchMovies('upcoming');
  return <MovieListPage title="개봉 예정 영화" movies={movies} />;
};

export default Upcoming;
