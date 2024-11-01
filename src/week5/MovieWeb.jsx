import "./MovieWeb.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import MoviesPage from "./pages/MoviesPage";
import LoginPage from "./pages/LoginPage";
import RootLayout from "./layout/root-layout";
import SignUpPage from "./pages/SignUpPage";
import SearchPage from "./pages/search";
import ExplorePage from "./pages/Explore";
import HomePage from "./pages/Home";
import MovieDetail from "./pages/movieDetail";
import LoginPageRefator from "./pages/LoginPageRefator";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "movies", // movie로 변경
        children: [
          {
            path: "now-playing",
            element: <MoviesPage query="now_playing" />,
          },
          {
            path: "popular",
            element: <MoviesPage query="popular" />,
          },
          {
            path: "top-rated",
            element: <MoviesPage query="top_rated" />,
          },
          {
            path: "up-coming",
            element: <MoviesPage query="upcoming" />,
          },
          {
            path: ":id",
            element: <MovieDetail />,
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "explore",
        element: <ExplorePage />,
      },
      {
        path: "movie/:id",
        element: <MovieDetail />,
      },
    ],
  },
]);

function MovieWeb() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default MovieWeb;
