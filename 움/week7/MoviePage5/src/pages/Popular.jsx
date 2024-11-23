import React from 'react';
import useFetchMovies from '../hooks/useFetchMovies';
import MovieListPage from '../components/MovieListPage';
import MovieCardListSkeleton from '../components/MovieCardListSkeleton';

const Popular = () => {
  const { data: movies, isLoading, isError } = useFetchMovies('popular');

  if (isLoading) return <MovieCardListSkeleton number={10} />;
  if (isError) return <h2 style={{ color: 'white' }}>데이터 로드 중 오류가 발생했습니다.</h2>;

  return <MovieListPage title="현재 상영중인 영화" movies={movies || []} />;
};

export default Popular;




// import React from 'react';
// import useFetchMovies from '../hooks/useFetchMovies';
// import MovieListPage from '../components/MovieListPage';

// const Popular = () => {
//   const movies = useFetchMovies('popular');
//   return <MovieListPage title="인기 영화" movies={movies} />;
// };

// export default Popular;
