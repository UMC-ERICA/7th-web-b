import { useState } from "react";
import styles from "./style.module.css";
import Input from "./Input";
import Button from "./Button";

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState("");

  //렌더링 방지
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //1. 추가하기
  const addTodo = () => {
    setTodos((prev) => [
      ...prev,
      { id: Math.floor(Math.random() * 100) + 2, task: text },
    ]);
    setText("");
  };

  //2. 삭제하기
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  //3. 수정하기
  const updateTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task: newText } : item))
    );
    setEditingId("");
  };
  return (
    <>
      <div className={styles.edit}>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onSubmit={handleSubmit}
          onClick={addTodo}
        />
      </div>
      <div className={styles.container}>
        {todos.map(({ id, task }, _) => (
          <div className={styles.lists} key={id}>
            <div>
              {/* 수정이 아닐 때 */}
              {editingId !== id && (
                <div>
                  <p className={styles.font}>{task}</p>
                </div>
              )}
              {/* 수정 중 상태일 때 */}
              {editingId === id && (
                <div className={styles.container}>
                  <input 
                    className={styles.edit}
                    defaultValue={task}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                </div>
              )}
              <div className={styles.buttons}>
                <Button onClick={() => deleteTodo(id)}>삭제하기</Button>
                {editingId === id ? (
                  <Button onClick={() => updateTodo(editingId, editText)}>
                    수정 완료
                  </Button>
                ) : (
                  <Button onClick={() => setEditingId(id)}>수정 진행</Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ToDoList;
