import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SearchPage from './pages/SearchPage';
import MoviesLayout from './components/MoviesLayout';
import NowPlaying from './pages/NowPlaying';
import styled from 'styled-components';

const RootLayout = styled.div`
  display: flex;
  padding-top: 60px;
  width: 100%;
`;

const SidebarContainer = styled.div`
  width: 200px;
  height: calc(100vh - 60px);
  background-color: #222;
  position: fixed;
  top: 60px;
  left: 0;
`;

const Content = styled.div`
  margin-left: 200px;
  width: calc(100% - 200px);
  padding: 1rem;
`;

const App = () => (
  <Router>
    <Navbar />
    <RootLayout>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/search" element={<SearchPage />} />
          
          {/* MoviesLayout를 부모로 설정하고 그 아래에 NowPlaying을 중첩 */}
          <Route path="/movies" element={<MoviesLayout />}>
            <Route path="now-playing" element={<NowPlaying />} />
          </Route>
        </Routes>
      </Content>
    </RootLayout>
  </Router>
);

export default App;
