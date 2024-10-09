import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import SideBar from "../components/sideBar";
import styled from "styled-components";

const RootLayout = () => {
  return (
    <LayoutContainer>
      <Navbar />
      <ContentContainer>
        <StyledSidebar>
          <SideBar />
        </StyledSidebar>
        <StyledOutlet>
          <Outlet />
        </StyledOutlet>
      </ContentContainer>
    </LayoutContainer>
  );
};

export default RootLayout;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1F1F1F;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
`;

const StyledSidebar = styled.aside`
  width: 120px;
  flex-shrink: 0;
  height: 100%;
`;

const StyledOutlet = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: #303134;
`;
