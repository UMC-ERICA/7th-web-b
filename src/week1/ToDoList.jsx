import { useState } from "react";
import styles from "./style.module.css";

function ToDoList() {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]); // 할 일 리스트 받는 state
  const [doneList, setDoneList] = useState([]); // 해낸 일 리스트 받는 state
  const [listId, setListId] = useState(0);

  const onChange = (event) => setInputValue(event.currentTarget.value);

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      if (inputValue) {
        setList((prev) => [
          ...prev,
          {
            id: listId,
            text: inputValue,
            status: false,
            done: false,
          },
        ]);
        setListId((prev) => prev + 1);
        setInputValue("");
      }
    }
  };

  // 문제가 해결된 코드
  const onClickDone = (id) => {
    setList((prevList) => {
      const doneUpdatedList = prevList.find((item) => item.id === id); // 완료된 항목 찾기
      const updatedList = prevList.filter((item) => item.id !== id); // 완료된 일을 제외한 리스트를 구성

      // 상태 업데이트를 분리하여 중복 방지
      setDoneList((prevDoneList) =>
        prevDoneList.some((item) => item.id === id)
          ? prevDoneList
          : [...prevDoneList, { ...doneUpdatedList, done: true }]
      );

      return updatedList;
    });
  };

  const onDelete = (id) => {
    const remainList = doneList.filter((item) => item.id !== id);
    setDoneList(remainList);
  };

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
