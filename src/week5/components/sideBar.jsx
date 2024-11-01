import { Link } from "react-router-dom";
import { IoIosEasel } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import styled from "styled-components";

const SideBar = () => {
  return (
    <StyledSideBar>
      <Search to="/search"><IoIosSearch /> 찾기</Search>
      <Explore to="/explore"><IoIosEasel /> 탐색</Explore>
    </StyledSideBar>
  );
};
export default SideBar;

const StyledSideBar = styled.nav`
  display: flex;
  height: auto;
  margin: 0px;
  flex-direction: column;
`;

const Search = styled(Link)`
  padding: 10px;
  width: 100%;
  text-decoration: none;
  color: white;
`;

const Explore = styled(Link)`
  padding: 10px;
  text-decoration: none;
  color: white;
`;
