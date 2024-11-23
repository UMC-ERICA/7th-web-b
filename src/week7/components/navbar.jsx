import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, displayEmail, logout } = useContext(AuthContext) || {};

  return (
    <StyledNav>
      <LogoButton to="/">Home</LogoButton>
      {isLoggedIn ? (
        <>
          <StyledDiv>{displayEmail ? `${displayEmail}님 반갑습니다.` : "환영합니다!"}</StyledDiv>
          <ButtonLink to="/" onClick={logout}>
            로그아웃
          </ButtonLink>
        </>
      ) : (
        <>
          <LoginButton to="/login">로그인</LoginButton>
          <ButtonLink to="/signup">회원가입</ButtonLink>
        </>
      )}
    </StyledNav>
  );
};


export default Navbar;

const StyledNav = styled.nav`
  display: flex;
  width: 100%;
  margin: 10px;
  justify-content: space-between;
  align-items: center; /* 수직 정렬을 위해 추가 */
`;
const LogoButton = styled(Link)`
  display: block;
  margin-left: 0%;
  width: 90px;
  padding: 8px;
  text-align: center;
  text-decoration: none;
  color: #f71161;
`;
const ButtonLink = styled(Link)`
  display: grid;
  background-color: #212121;
  width: 90px;
  padding: 8px;
  border-radius: 15px;
  text-align: center;
  text-decoration: none;
  color: white;

  margin-right: 30px; /* 오른쪽 끝에서 45px만큼 떼어놓기 */
  &:hover {
    background-color: #f71161; /* Hover 시 변경되는 스타일 */
  }
`;
const LoginButton = styled(Link)`
  display: grid;
  background-color: #212121;
  width: 70px;
  padding: 8px;
  border-radius: 15px;
  text-align: center;
  margin-left: auto; /* 오른쪽으로 밀기 위해 auto 사용 */
  text-decoration: none;
  color: white;
  &:hover {
    background-color: #f71161; /* Hover 시 변경되는 스타일 */
  }
`;

const StyledDiv = styled.div`
  display: grid;
  background-color: #212121;
  margin-left: 75%;
  margin-left: auto; /* 오른쪽으로 밀기 위해 auto 사용 */
  width: 200px;
  padding: 8px;
  border-radius: 15px;
  text-align: center;
  text-decoration: none;
`;
