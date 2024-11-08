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
import Popular from './pages/Popular';
import TopRated from './pages/TopRated';
import Upcoming from './pages/Upcoming';
import MovieCategories from './components/MovieCategories';
import MovieDetail from './pages/MovieDetail'; // 영화 상세 페이지 컴포넌트 추가
import styled from 'styled-components';

const RootLayout = styled.div`
  display: flex;
  padding-top: 60px;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const SidebarContainer = styled.div`
  width: 200px;
  height: calc(100vh - 60px);
  background-color: #222;
  position: fixed;
  top: 60px;
  left: 0;
  overflow-y:auto;
`;

const Content = styled.div`
  margin-left: 200px;
  width: calc(100% - 200px);
  padding: 1rem;
  overflow-x: hidden;
  overflow-y:auto;
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
          <Route path="/movies" element={<MoviesLayout />}>
            <Route index element={<MovieCategories />} />
            <Route path="now-playing" element={<NowPlaying />} />
            <Route path="popular" element={<Popular />} />
            <Route path="top-rated" element={<TopRated />} />
            <Route path="upcoming" element={<Upcoming />} />
            <Route path="/movies/:movieId" element={<MovieDetail />} /> {/* 영화 상세 페이지 경로 추가 */}
          </Route>
        </Routes>
      </Content>
    </RootLayout>
  </Router>
);

export default App;
