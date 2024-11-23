import { useParams } from "react-router-dom";
import { useState } from "react";
import useGetTodoAPI from "../hooks/useGetToDoAPI";
import usePatchAPI from "../hooks/usePatchAPI";
import useDeleteAPI from "../hooks/useDeleteAPI";
import { useNavigate } from "react-router-dom";
export default function ToDoDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError } = useGetTodoAPI(`/todo/${id}`);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editingId, setEditingId] = useState("");
  const {
    patchData,
    isLoading: isPatchLoading,
    isError: isPatchError,
  } = usePatchAPI("/todo");
  const {
    deleteData,
    isLoading: isDeleteLoading,
    isError: isDeleteError,
  } = useDeleteAPI("/todo");

  const editing = () => {
    setEditingId(id);
    setEditTitle(data.title);
    setEditContent(data.content);
  };

  const deleteTodo = () => {
    deleteData(id);
    navigate("/");
  };

  const updateTodo = async () => {
    patchData(
      { id: editingId, data: { title: editTitle, content: editContent } },
      {
        onSuccess: () => {
          console.log(`${id}번의 todo를 수정했습니다.`);
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {editingId !== id ? (
        <>
          <h1 style={{ color: "black" }}>ToDo Detail</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              color: "black",
            }}
          >
            <p>id : {id}</p>
            <p>title : {data.title}</p>
            <p>content : {data.content}</p>
            <p>createdAt : {data.createdAt}</p>
            <p>checked : {data.checked ? "완료" : "미완료"}</p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              style={{ width: "100px", borderRadius: "10px" }}
              onClick={editing}
            >
              수정
            </button>
            <button
              style={{ width: "100px", borderRadius: "10px" }}
              onClick={deleteTodo}
            >
              삭제
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 style={{ color: "black" }}>ToDo Detail</h1>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <input
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <div>
            <button onClick={updateTodo}>수정 완료</button>
          </div>
        </>
      )}
    </div>
  );
}
