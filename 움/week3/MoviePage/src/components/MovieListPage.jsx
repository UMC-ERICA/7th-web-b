import React from 'react';
import MovieCard from './MovieCard';
import styled from 'styled-components';

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); // 최소 180px, 너비에 따라 유동적
  gap: 1rem;
  padding: 1rem;
  width: 100%; // MovieGrid가 부모 요소 너비를 꽉 채우도록 설정
  box-sizing: border-box;
`;

const MovieListPage = ({ title, movies }) => (
  <div>
    <h2>{title}</h2>
    <MovieGrid>
      {movies.map(movie => (
        <MovieCard key={movie.id} title={movie.title} releaseDate={movie.release_date} posterPath={movie.poster_path} />
      ))}
    </MovieGrid>
  </div>
);

export default MovieListPage;
