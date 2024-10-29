import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <StyledNav>
      <LogoButton to="/">Home</LogoButton>
      <LoginButton to="/login">로그인</LoginButton>
      <ButtonLink to="/signup">회원가입</ButtonLink>
    </StyledNav>
  );
};

export default Navbar;

const StyledNav = styled.nav`
  display: flex;
  margin: 10px;
`;
const LogoButton = styled(Link)`
  display: grid;
  width: 90px;
  padding: 8px;
  text-align: center;
  text-decoration: none;
  color: #F71161;
`
const ButtonLink = styled(Link)`
  display: grid;
  background-color: #212121;
  width: 90px;
  padding: 8px;
  border-radius: 15px;
  text-align: center;
  text-decoration: none;
  color: white;
  &:hover {
    background-color: #F71161; /* Hover 시 변경되는 스타일 */
  }
`;
const LoginButton = styled(Link)`
  display: grid;
  background-color: #212121;
  width: 70px;
  padding: 8px;
  border-radius: 15px;
  text-align: center;
  margin-left: auto; /* 오른쪽 정렬 */
  text-decoration: none;
  color: white;
  &:hover {
    background-color: #F71161; /* Hover 시 변경되는 스타일 */
  }
`;
