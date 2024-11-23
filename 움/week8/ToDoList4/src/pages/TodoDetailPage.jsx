import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const TodoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/todo/${id}`);
        setTodo(response.data);
      } catch (err) {
        console.error("Failed to fetch todo:", err);
      }
    };
    fetchTodo();
  }, [id]);

  if (!todo) return <p>Loading...</p>;

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <Container>
      <h1>{todo.title}</h1>
      <p>{todo.content}</p>
      <p>생성 날짜: {formatDate(todo.createdAt)}</p>
      <p>상태: {todo.checked ? "완료" : "미완료"}</p>
      <button onClick={() => navigate("/")}>목록으로 돌아가기</button>
    </Container>
  );
};

export default TodoDetailPage;

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;

  button {
    margin-top: 20px;
    padding: 10px;
    background: #6200ea;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background: #3700b3;
    }
  }
`;