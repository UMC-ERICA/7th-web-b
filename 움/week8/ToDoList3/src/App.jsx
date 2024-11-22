import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { deleteTodo, postTodo, getTodoList, patchTodo } from "./apis/todo";
import { queryClient } from "./main";
// import Button from "./components/Button"; // Button 컴포넌트 import
// import Input from "./components/Input"; // Input 컴포넌트 import

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
    mutate({ title, content });
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
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid purple;
  border-radius: 20px;
`;

const Button = styled.button`
  padding: 20px;
  border: none;
  border-radius: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TodoContainer = styled.div`
  display: flex;
  gap: 5px;
`;

// function App() {
//     const [todos, setTodos] = useState([
//         {id: 1, task: '투두 만들어보기'},
//         {id: 2, task: '희연 혜원 혜윤 건 찬민'}
//     ]);
//     const [text, setText] = useState('');
//     const [editingId, setEditingId] = useState('');
//     const [editText, setEditText] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//     };

//     // 1. 추가하기
//     const addTodo = () => {
//         setTodos((prev) => [
//             ...prev,
//             {id: Math.floor(Math.random() * 100) + 2, task: text}
//         ]);
//         setText('');
//     };

//     // 2. 삭제하기
//     const deleteTodo = (id) => {
//         setTodos((prev) => prev.filter((item) => item.id !== id));
//     };

//     // 3. 수정하기
//     const updateTodo = (id, text) => {
//         setTodos((prev) =>
//             prev.map((item) => (item.id === id ? { ...item, task: text } : item))
//         );
//         setEditingId('');
//     };

//     return (
//         <>
//             <form onSubmit={handleSubmit}>
//                 <Input
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                     placeholder="할 일을 입력하세요"
//                 />
//                 <Button onClick={addTodo} type="submit">
//                     할 일 등록
//                 </Button>
//             </form>

//             <div className="todo-list">
//                 {todos.map((todo) => (
//                     <div key={todo.id} className="todo-item">
//                         {editingId !== todo.id ? (
//                             <div className="todo-text">
//                                 <p>{todo.id}. {todo.task}</p>
//                             </div>
//                         ) : (
//                             <div className="todo-text">
//                                 <p>{todo.id}. </p>
//                                 <Input
//                                     defaultValue={todo.task}
//                                     onChange={(e) => setEditText(e.target.value)}
//                                 />
//                             </div>
//                         )}
//                         <Button onClick={() => deleteTodo(todo.id)}>
//                             삭제하기
//                         </Button>
//                         {editingId === todo.id ? (
//                             <Button onClick={() => updateTodo(editingId, editText)}>
//                                 수정 완료
//                             </Button>
//                         ) : (
//                             <Button onClick={() => setEditingId(todo.id)}>
//                                 수정 진행
//                             </Button>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </>
//     );
// }

// export default App;
