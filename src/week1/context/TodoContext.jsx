import { createContext, useState } from "react";

export const TodoContext = createContext();

export function TodoContextProvider({ children }) {
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
    <TodoContext.Provider
      value={{
        inputValue,
        list,
        doneList,
        listId,
        onChange,
        activeEnter,
        onClickDone,
        onDelete,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
