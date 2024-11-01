import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #333;
  color: #fff;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  width: 100%;
`;

const Poster = styled.img`
  width: 100%;
  height: 250px; // 포스터 높이를 고정하여 카드 크기 일정하게 유지
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

const MovieCard = ({ title, releaseDate, posterPath }) => (
  <Card>
    <Poster src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} />
    <MovieTitle>{title}</MovieTitle>
    <ReleaseDate>{releaseDate}</ReleaseDate>
  </Card>
);

export default MovieCard;
