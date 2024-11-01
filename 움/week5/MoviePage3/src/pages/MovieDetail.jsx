import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled(Link)`
  background-color: #333;
  color: #fff;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  width: 100%;
  text-decoration: none; /* 링크 텍스트의 기본 밑줄 제거 */
  &:hover {
    background-color: #555; /* 호버 시 약간 더 밝은 배경색 */
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 250px; /* 포스터 높이를 고정하여 카드 크기 일정하게 유지 */
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

const MovieCard = ({ movieId, title, releaseDate, posterPath }) => (
  <Card to={`/movies/${movieId}`}>
    <Poster src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} />
    <MovieTitle>{title}</MovieTitle>
    <ReleaseDate>{releaseDate}</ReleaseDate>
  </Card>
);

export default MovieCard;
