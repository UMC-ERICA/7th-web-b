import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { deleteTodo, postTodo, getTodoList, patchTodo } from "./apis/todo";
import { queryClient } from "./main";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState(false);

  const { data: todos, isPending } = useQuery({
    queryFn: () => getTodoList({ title: search }),
    queryKey: ["todos", search],
  });

  const { mutate: postTodoMutation } = useMutation({
    mutationFn: postTodo,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      console.log("항상 실행됨");
    },
  });

  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const { mutate: patchTodoMutation } = useMutation({
    mutationFn: patchTodo,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지
    console.log(title, content);
    postTodoMutation({ title, content });
  };

  return (
    <>
      <h1>Todo 검색</h1>
      <Input
        style={{ marginBottom: "10px" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Form onSubmit={handleSubmit}>
        <Input
          name="title"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          name="content"
          placeholder="컨텐츠를 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit">투두 생성</Button>
      </Form>
      {isPending ? (
        <div>로딩중입니다.</div>
      ) : (
        <Container>
          {todos[0]?.map((todo) => {
            console.log(todo);
            return (
              <TodoContainer key={todo.id}>
                <input
                  type="checkbox"
                  defaultChecked={todo.checked}
                  onChange={(e) =>
                    patchTodoMutation({ id: todo.id, checked: !todo.checked })
                  }
                />
                <div>
                  <p>{todo.title}</p>
                  <p>{todo.content}</p>
                </div>
                <button onClick={() => deleteTodoMutation({ id: todo.id })}>
                  삭제하기
                </button>
              </TodoContainer>
            );
          })}
        </Container>
      )}
    </>
  );
}

export default App;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: none;
  transition: all 0.3s;

  &:focus {
    border-color: #6200ea;
    box-shadow: 0 0 4px rgba(98, 0, 234, 0.5);
  }
`;

const Button = styled.button`
  padding: 12px 16px;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  background-color: #6200ea;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #3700b3;
  }

  &:active {
    background-color: #1c0067;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
`;

const TodoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: s10px;
  padding: 16px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  p {
    margin: 0;
    font-size: 16px;
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  button {
    padding: 8px 12px;
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
    background-color: #d32f2f;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: #b71c1c;
    }

    &:active {
      background-color: #7f0000;
    }
  }
`;
