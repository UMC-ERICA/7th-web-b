import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  justify-content: center;
`;

const CategoryBox = styled(Link)`
  width: 200px;
  height: 150px;
  background-color: #333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1.2rem;
  transition: transform 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background-color: #555;
  }
`;

const MovieCategories = () => (
  <CategoriesContainer>
    <CategoryBox to="/movies/now-playing">현재 상영중인</CategoryBox>
    <CategoryBox to="/movies/popular">인기있는</CategoryBox>
    <CategoryBox to="/movies/top-rated">높은 평가를 받은</CategoryBox>
    <CategoryBox to="/movies/upcoming">개봉 예정중인</CategoryBox>
  </CategoriesContainer>
);

export default MovieCategories;
