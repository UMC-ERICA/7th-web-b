import React, { useState } from "react";
import styled from "styled-components";

const TodoForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Title and content are required!");
      return;
    }
    onSubmit(formData);
    setFormData({ title: "", content: "" });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Input
        type="text"
        name="title"
        value={formData.title}
        placeholder="Enter title"
        onChange={handleChange}
      />
      <Textarea
        name="content"
        value={formData.content}
        placeholder="Enter content"
        onChange={handleChange}
      />
      <Button type="submit">Add Todo</Button>
    </StyledForm>
  );
};

export default TodoForm;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    border-color: #6200ea;
    outline: none;
    box-shadow: 0 0 5px rgba(98, 0, 234, 0.5);
  }
`;

const Textarea = styled.textarea`
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  resize: none;

  &:focus {
    border-color: #6200ea;
    outline: none;
    box-shadow: 0 0 5px rgba(98, 0, 234, 0.5);
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  background: #6200ea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #3700b3;
  }

  &:active {
    background: #1c0067;
  }
`;
