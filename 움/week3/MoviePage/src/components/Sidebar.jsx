import React from 'react';
import { Link } from 'react-router-dom';
import { FaFilm, FaSearch } from 'react-icons/fa';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  padding: 1.5rem;
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #fff;
  padding: 0.5rem;
  text-decoration: none;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
    color: #fff;
  }
`;

const Sidebar = () => (
  <SidebarContainer>
    <SidebarLink to="/search">
      <FaSearch style={{ marginRight: '0.5rem' }} /> 찾기
    </SidebarLink>
    <SidebarLink to="/movies/now-playing">
      <FaFilm style={{ marginRight: '0.5rem' }} /> 영화
    </SidebarLink>
  </SidebarContainer>
);

export default Sidebar;
