import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/todo", {
          params: { title: search },
        });
        setTodos(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [search]);

  if (loading) return <Loading>Loading...</Loading>;
  if (error) return <ErrorBox>Error: {error}</ErrorBox>;

  return (
    <Container>
      <SearchBox>
        <input
          type="text"
          placeholder="Search todos"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchBox>
      <TodoGrid>
        {todos.map((todo) => (
          <TodoCard key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.content}</p>
            <Link to={`/todo/${todo.id}`}>View Details</Link>
          </TodoCard>
        ))}
      </TodoGrid>
    </Container>
  );
};

export default TodoList;

const Container = styled.div`
  padding: 20px;
`;

const SearchBox = styled.div`
  margin-bottom: 20px;
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const TodoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const TodoCard = styled.div`
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  h3 {
    margin: 0 0 10px;
  }
  p {
    margin: 0 0 15px;
  }
  a {
    color: #6200ea;
    text-decoration: none;
  }
`;

const Loading = styled.div`
  text-align: center;
  font-size: 20px;
`;

const ErrorBox = styled.div`
  color: red;
  text-align: center;
  font-size: 18px;
`;


// import React from "react";
// import styled from "styled-components";

// const TodoList = ({ todos, onDelete, onToggle }) => {
//   if (!todos || todos.length === 0) return <p>No todos available!</p>;

//   return (
//     <StyledList>
//       {todos.map((todo) => (
//         <TodoItem key={todo.id}>
//           <Checkbox>
//             <input
//               type="checkbox"
//               checked={todo.checked}
//               onChange={() => onToggle(todo.id, !todo.checked)}
//             />
//             <span>{todo.checked ? "Completed" : "Not Completed"}</span>
//           </Checkbox>
//           <Details>
//             <h3>{todo.title}</h3>
//             <p>{todo.content}</p>
//           </Details>
//           <Actions>
//             <button onClick={() => onDelete(todo.id)}>Delete</button>
//           </Actions>
//         </TodoItem>
//       ))}
//     </StyledList>
//   );
// };

// export default TodoList;

// const StyledList = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin: 20px 0;
// `;

// const TodoItem = styled.li`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 16px;
//   background: #f9f9f9;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   margin-bottom: 10px;
// `;

// const Checkbox = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;

//   input[type="checkbox"] {
//     width: 18px;
//     height: 18px;
//   }

//   span {
//     font-size: 14px;
//     color: #555;
//   }
// `;

// const Details = styled.div`
//   flex-grow: 1;
//   margin-left: 20px;

//   h3 {
//     margin: 0 0 5px 0;
//     font-size: 18px;
//   }

//   p {
//     margin: 0;
//     color: #777;
//     font-size: 14px;
//   }
// `;

// const Actions = styled.div`
//   button {
//     padding: 8px 12px;
//     font-size: 14px;
//     background: #d32f2f;
//     color: white;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;

//     &:hover {
//       background: #b71c1c;
//     }

//     &:active {
//       background: #7f0000;
//     }
//   }
// `;
