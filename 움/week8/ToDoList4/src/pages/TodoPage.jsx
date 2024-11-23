import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: "", content: "" });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/todo");
      setTodos(response.data);
    } catch (err) {
      console.error("할 일을 불러오는 데 실패했습니다:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/todo", {
        ...formData,
        checked: false,
        createdAt: new Date().toISOString(),
      });
      setTodos((prev) => [...prev, response.data]);
      setFormData({ title: "", content: "" });
    } catch (err) {
      console.error("할 일을 추가하는 데 실패했습니다:", err);
    }
  };

  const handleDeleteTodo = async (id) => {
    if (!id) {
      console.error("삭제하려는 할 일의 ID가 없습니다.");
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/todo/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("할 일을 삭제하는 데 실패했습니다:", err);
    }
  };

  const toggleTodoChecked = async (id, checked) => {
    try {
      const response = await axios.patch(`http://localhost:3000/todo/${id}`, { checked });
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, checked: response.data.checked } : todo
        )
      );
    } catch (err) {
      console.error("할 일의 상태를 변경하는 데 실패했습니다:", err);
    }
  };

  const handleEdit = (id, title, content) => {
    setEditId(id);
    setEditData({ title, content });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/todo/${editId}`, editData);
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editId ? { ...todo, ...response.data } : todo
        )
      );
      setEditId(null);
    } catch (err) {
      console.error("할 일을 수정하는 데 실패했습니다:", err);
    }
  };

  const handleNavigateToDetail = (id) => {
    navigate(`/todo/${id}`);
  };

  if (isLoading) return <Loading>로딩 중...</Loading>;

  return (
    <Container>
      <h1>할 일 목록</h1>
      <InputContainer>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          value={formData.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="내용을 입력해주세요"
          value={formData.content || ""}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />
        <button onClick={handleAddTodo}>ToDo 생성</button>
      </InputContainer>
      <TodoList>
        {todos.map((todo) => (
          <TodoItem key={todo.id}>
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={() => toggleTodoChecked(todo.id, !todo.checked)}
            />
            {editId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editData.title || ""}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                />
                <input
                  value={editData.content || ""}
                  onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                />
                <button onClick={handleSaveEdit}>저장</button>
                <button onClick={() => setEditId(null)}>취소</button>
              </>
            ) : (
              <>
                <div onClick={() => handleNavigateToDetail(todo.id)}>
                  <h3>{todo.title}</h3>
                  <p>{todo.content}</p>
                </div>
                <div>
                  <button onClick={() => handleEdit(todo.id, todo.title, todo.content)}>
                    수정
                  </button>
                  <button onClick={() => handleDeleteTodo(todo.id)}>삭제</button>
                </div>
              </>
            )}
          </TodoItem>
        ))}
      </TodoList>
    </Container>
  );
};

export default TodoPage;

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  button {
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

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    margin: 0;
  }

  p {
    margin: 5px 0;
  }

  a {
    text-decoration: none;
    color: black;
  }

  button {
    margin-left: 10px;
    padding: 5px 10px;
    background: #d32f2f;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background: #b71c1c;
    }
  }
`;

const Loading = styled.div`
  text-align: center;
  font-size: 20px;
  padding: 50px;
  color: #6200ea;
`;
