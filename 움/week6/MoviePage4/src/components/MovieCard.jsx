import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled(Link)`
  background-color: rgba(51, 51, 51, 0);
  color: #fff;
  border-radius: 8px;
  overflow: hidden;
  width: 168px;
  text-decoration: none;
  margin: 8px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const Poster = styled.img`
  width: 168px;
  height: 240px;
  object-fit: cover;
  border-radius: 8px;
`;

const MovieTitle = styled.h3`
  font-size: 1rem;
  margin: 0;
  margin-left: 8px;
`;

const ReleaseDate = styled.p`
  font-size: 0.8rem;
  color: #ccc;
  margin: 0;
  margin-left: 8px;
`;

const MovieCard = ({ id, title, releaseDate, posterPath }) => (
  <Card to={`/movies/${id}`}>
    <Poster src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} />
    <MovieTitle>{title}</MovieTitle>
    <ReleaseDate>{releaseDate}</ReleaseDate>
  </Card>
);

export default MovieCard;
