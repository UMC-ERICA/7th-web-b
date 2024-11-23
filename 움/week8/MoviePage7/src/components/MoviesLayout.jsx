import React from 'react';
import { Outlet } from 'react-router-dom';

const MoviesLayout = () => (
  <div>
    <h2>영화 페이지</h2>
    <Outlet /> {/* 하위 라우트가 이 위치에 렌더링됩니다 */}
  </div>
);

export default MoviesLayout;
