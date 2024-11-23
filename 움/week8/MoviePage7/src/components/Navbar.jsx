import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchUserInfo } from '../services/authService';

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
  }
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
    background-color: #666a73;
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

// 추가된 LogoutButton 스타일 정의
const LogoutButton = styled.button`
  color: #fff;
  padding: 0.3rem 0.7rem;
  background-color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
    background-color: #666a73;
  }
`;

const Navbar = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userInfo = await fetchUserInfo();
        setUserName(userInfo.email.split('@')[0]); // 이메일의 @ 앞 부분을 이름으로 사용
      } catch (error) {
        console.error('유저 정보 로드 실패:', error);
      }
    };
    loadUserInfo();
  }, []);

  const handleLogout = () => {
    // 로컬 스토리지에서 토큰 삭제
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUserName(''); // 로그인 상태를 초기화
    navigate('/login'); // 로그인 페이지로 이동
  };

  return (
    <NavbarContainer>
      <Logo to="/">YONGCHA</Logo>
      <ButtonContainer>
        {userName ? (
          <>
            <span>{userName}님 반갑습니다.</span>
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          </>
        ) : (
          <>
            <LoginButton to="/login">로그인</LoginButton>
            <SignupButton to="/signup">회원가입</SignupButton>
          </>
        )}
      </ButtonContainer>
    </NavbarContainer>
  );
};

export default Navbar;
