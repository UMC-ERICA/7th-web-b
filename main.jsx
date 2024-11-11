import { createRoot } from "react-dom/client";
import ToDoList from "./src/week1/ToDoList";
import MovieWebWeek3 from "./src/week3/MovieWeb";
import MovieWebWeek4 from "./src/week4/MovieWeb";
import MovieWebWeek5 from "./src/week5/MovieWeb";
import MovieWebWeek6 from "./src/week6/MovieWeb";
import { TodoContextProvider } from "./src/week1/context/TodoContext";
import { AuthContextProvider } from "./src/week6/context/AuthContext";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <MovieWebWeek6 />
  </AuthContextProvider>
);
