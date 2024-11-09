import { useContext } from "react";
import styles from "./style.module.css";
import { TodoContext } from "./context/TodoContext";

function ToDoList() {
  const {
    inputValue,
    list,
    doneList,
    onChange,
    activeEnter,
    onClickDone,
    onDelete,
  } = useContext(TodoContext);
  return (
    <div>
      <div className={styles.container}>
        <h2 className={styles.todolist}>UMC Study Plan</h2>
        <hr
          style={{
            width: "80%",
          }}
        />
        <input
          className={styles.inputField}
          id="todo"
          placeholder="스터디 계획을 작성해보세요!"
          type="text"
          value={inputValue}
          onChange={onChange}
          onKeyDown={activeEnter}
        />
      </div>
      <div className={styles.listContainer}>
        <div className={styles.box}>
          <h6 className={styles.underline}>해야 할 일</h6>
          <div className={styles.todolist}>
            {list.map((item) => (
              <div key={item.id}>
                {item.text}
                <button onClick={() => onClickDone(item.id)}>완료</button>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.box}>
          <h6 className={styles.underline}>해낸 일</h6>
          <div className={styles.todolist}>
            {doneList.map((item) => (
              <div key={item.id}>
                {item.text}
                <button onClick={() => onDelete(item.id)}>삭제</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
