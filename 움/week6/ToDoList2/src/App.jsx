import { useState } from "react";
import "./App.css";
import Button from "./components/Button"; // Button 컴포넌트 import
import Input from "./components/Input"; // Input 컴포넌트 import
import { useContext } from "react";
import { ToDoContext } from "./context/ToDoContext";

function App() {
    const {
        todos,
        text,
        setText,
        editingId,
        setEditingId,
        editText,
        setEditText,
        handleSubmit,
        addTodo,
        deleteTodo,
        updateTodo,
    } = useContext(ToDoContext);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <Button onClick={addTodo} type="submit">
          할 일 등록
        </Button>
      </form>

      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            {editingId !== todo.id ? (
              <div className="todo-text">
                <p>
                  {todo.id}. {todo.task}
                </p>
              </div>
            ) : (
              <div className="todo-text">
                <p>{todo.id}. </p>
                <Input
                  defaultValue={todo.task}
                  onChange={(e) => setEditText(e.target.value)}
                />
              </div>
            )}
            <Button onClick={() => deleteTodo(todo.id)}>삭제하기</Button>
            {editingId === todo.id ? (
              <Button onClick={() => updateTodo(editingId, editText)}>
                수정 완료
              </Button>
            ) : (
              <Button onClick={() => setEditingId(todo.id)}>수정 진행</Button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
