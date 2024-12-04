import { createRoot } from "react-dom/client";
import ToDoList from "./src/week1/ToDoList";
import MovieWebWeek3 from "./src/week3/MovieWeb";
import MovieWebWeek4 from "./src/week4/MovieWeb";
import MovieWebWeek5 from "./src/week5/MovieWeb";
import MovieWebWeek6 from "./src/week6/MovieWeb";
import MovieWebWeek7 from "./src/week7/MovieWeb";
import ToDoListWeek8 from "./src/week8/ToDoList";
import ToDoDetailPage from "./src/week8/pages/ToDoDetailPage";
import { TodoContextProvider } from "./src/week1/context/TodoContext";
import { AuthContextProvider } from "./src/week6/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./src/week9/redux/store";
import App from "./src/week9/App";

//week1~6주차까지는 이렇게 실행
// createRoot(document.getElementById("root")).render(
//   <AuthContextProvider>
//     <MovieWebWeek7 />
//   </AuthContextProvider>
// );

// Tanstack Query사용하는 7주차부터는 이렇게 실행
// const queryClient = new QueryClient();

// createRoot(document.getElementById("root")).render(
//   <QueryClientProvider client={queryClient}>
//     {/* <AuthContextProvider> */}
//       <Router>
//         <Routes>
//           <Route path="/" element={<ToDoListWeek8 />} />
//           <Route path="/:id" element={<ToDoDetailPage />} />
//         </Routes>
//       </Router>
//     {/* </AuthContextProvider> */}
//   </QueryClientProvider>
// );

// Redux사용하는 9주차부터는 이렇게 실행
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
