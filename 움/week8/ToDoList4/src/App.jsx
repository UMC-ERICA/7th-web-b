import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import TodoDetailPage from "./pages/TodoDetailPage"; // 단일 Todo 상세 페이지

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/todo/:id" element={<TodoDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
