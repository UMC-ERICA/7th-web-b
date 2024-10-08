import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #333;
  height: 50px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

const Logo = styled(Link)`
  color: #ff007f;
  font-size: 1.5rem;
  text-decoration: none;
  padding: 0.5rem;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
    color: #ff007f;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-right: 2rem;
`;

const LoginButton = styled(Link)`
  color: #fff;
  padding: 0.3rem 0.7rem;
  background-color: #333;
  text-decoration: none;
  border-radius: 4px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
    color: #fff;
    background-color: #666a73
  }
`;

const SignupButton = styled(Link)`
  color: #fff;
  padding: 0.3rem 0.7rem;
  background-color: #ff007f;
  text-decoration: none;
  border-radius: 4px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
    color: #fff;
    background-color: #bf3471;
  }
`;

const Navbar = () => (
  <NavbarContainer>
    <Logo to="/">YONGCHA</Logo>
    <ButtonContainer>
      <LoginButton to="/login">로그인</LoginButton>
      <SignupButton to="/signup">회원가입</SignupButton>
    </ButtonContainer>
  </NavbarContainer>
);

export default Navbar;