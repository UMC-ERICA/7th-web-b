import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled(Link)`
  background-color: #333;
  color: #fff;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  width: 100%;
  text-decoration: none; /* 링크 스타일 제거 */
`;

const Poster = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const MovieTitle = styled.h3`
  font-size: 1rem;
  margin: 0.5rem 0;
`;

const ReleaseDate = styled.p`
  font-size: 0.8rem;
  color: #ccc;
`;

const MovieCard = ({ id, title, releaseDate, posterPath }) => (
  <Card to={`/movies/${id}`}>
    <Poster src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} />
    <MovieTitle>{title}</MovieTitle>
    <ReleaseDate>{releaseDate}</ReleaseDate>
  </Card>
);

export default MovieCard;
