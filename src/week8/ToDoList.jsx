import { useState } from "react";
import styles from "./style.module.css";
import Input from "./components/Input";
import styled from "styled-components";
import useGetAPI from "./hooks/useGetAPI";
import usePostAPI from "./hooks/usePostAPI";
import useDeleteAPI from "./hooks/useDeleteAPI";
import usePatchAPI from "./hooks/usePatchAPI";
import { useNavigate } from "react-router-dom";
function ToDoList() {
  const navigate = useNavigate();
  const {
    data,
    isLoading: isGetLoading,
    isError: isGetError,
  } = useGetAPI("/todo");
  const {
    postData,
    isLoading: isPostLoading,
    isError: isPostError,
  } = usePostAPI("/todo");
  const {
    deleteData,
    isLoading: isDeleteLoading,
    isError: isDeleteError,
  } = useDeleteAPI("/todo");
  const {
    patchData,
    isLoading: isPatchLoading,
    isError: isPatchError,
  } = usePatchAPI("/todo");

  const [task, setTask] = useState("");
  const [content, setContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editingId, setEditingId] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  //렌더링 방지
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //1. 추가하기
  const addTodo = async () => {
    const newTodo = {
      title: task,
      content: content,
    };

    postData(newTodo, {
      onSuccess: () => {
        setTask("");
        setContent("");
        console.log(data[0]);
      },
      onError: (error) => {
        console.error("Todo 추가 실패:", error);
      },
    });
  };

  //2. 삭제하기
  const deleteTodo = async (id) => {
    deleteData(id, {
      onSuccess: () => {
        console.log(`${id}번의 todo를 삭제했습니다.`);
      },
      onError: (error) => {
        console.error(`Todo ${id} 삭제 실패:`, error);
      },
    });
  };

  //3. 수정하기
  const Editing = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditContent(task.content);
    setIsCompleted(task.isCompleted);
  };

  const updateTodo = async (id) => {
    console.log("수정중");
    console.log(editingId);
    patchData(
      { id: editingId, data: { title: editTitle, content: editContent } },
      {
        onSuccess: () => {
          console.log(`${id}번의 todo를 수정했습니다.`);
          console.log(data[0]);
          setEditingId("");
          setEditTitle("");
          setEditContent("");
        },
        onError: (error) => {
          console.error("Update failed:", error);
        },
      }
    );
  };

  //4. 완료 표시
  const toggleComplete = async (id) => {
    patchData(
      { id, data: { checked: !isCompleted } },
      {
        onSuccess: () => {
          console.log(`${id}번의 상태를 변경했습니다.`);
        },
        onError: (error) => {
          console.error("Update failed:", error);
        },
      }
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {/* 할일 입력부분 */}
      <StyledContainer>
        <StyledTitle>UMC ToDoList</StyledTitle>
        <StyledInput>
          <Input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onSubmit={handleSubmit}
            onClick={addTodo}
            placeholder="제목을 입력해주세요"
          />
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onSubmit={handleSubmit}
            onClick={addTodo}
            placeholder="내용을 입력해주세요"
          />
          <StyledGenerateButton onClick={addTodo} type="submit">
            ToDo 생성
          </StyledGenerateButton>
        </StyledInput>

        {/* 할일 목록부분 */}
        <StyledLists>
          {isGetLoading ? (
            <StyledTodoItem>
              <div
                style={{
                  color: "black",
                  width: "485px",
                  height: "100px",
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "30px",
                }}
              >
                로딩 중...
              </div>
            </StyledTodoItem>
          ) : isGetError ? (
            <StyledTodoItem>
              <div
                style={{
                  color: "red",
                  width: "485px",
                  height: "100px",
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "30px",
                }}
              >
                에러가 발생했습니다
              </div>
            </StyledTodoItem>
          ) : !data[0]?.length ? (
            <StyledTodoItem>
              <p style={{ color: "red" }}>할 일이 없습니다.</p>
            </StyledTodoItem>
          ) : (
            data[0]
              .filter((task) => task.id !== undefined)
              .map((task) => (
                <StyledTodoItem key={task.id}>
                  {editingId !== task.id ? (
                    <TodoWrapper>
                      <input
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() => toggleComplete(task.id)}
                        style={{ marginRight: "10px" }}
                      />
                      <TodoContent>
                        <StyledP>{task.title}</StyledP>
                        <StyledP>{task.content}</StyledP>
                      </TodoContent>
                      <div>
                        <StyledButton onClick={() => navigate(`/${task.id}`)}>
                          상세보기
                        </StyledButton>
                        <StyledButton onClick={() => deleteTodo(task.id)}>
                          삭제하기
                        </StyledButton>
                        <StyledButton onClick={() => Editing(task)}>
                          수정 진행
                        </StyledButton>
                      </div>
                    </TodoWrapper>
                  ) : (
                    <TodoWrapper>
                      <input
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() => toggleComplete(task.id)}
                        style={{ marginRight: "10px" }}
                      />
                      <TodoContent>
                        <input
                          className={styles.edit}
                          defaultValue={task.title}
                          onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <input
                          className={styles.edit}
                          defaultValue={task.content}
                          onChange={(e) => setEditContent(e.target.value)}
                        />
                      </TodoContent>
                      <div>
                        <StyledButton onClick={() => deleteTodo(task.id)}>
                          삭제하기
                        </StyledButton>
                        <StyledButton onClick={() => updateTodo(task.id)}>
                          수정 완료
                        </StyledButton>
                      </div>
                    </TodoWrapper>
                  )}
                </StyledTodoItem>
              ))
          )}
        </StyledLists>
      </StyledContainer>
    </div>
  );
}
export default ToDoList;

const StyledTitle = styled.h1`
  text-align: center;
  color: black;
  margin-top: 100px;
  margin-bottom: 100px;
`;

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const StyledGenerateButton = styled.button`
  width: 500px;
  height: 30px;
  border-radius: 10px;
  margin-bottom: 50px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  justify-content: center;
`;

const StyledLists = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledP = styled.p`
  color: black;
  margin: 0;
  height: 30px;
  display: flex;
  align-items: center;
`;

const StyledTodoItem = styled.div`
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  gap: 10px;
`;

const TodoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const TodoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const StyledButton = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 10px;
  margin: 0 5px;
`;
