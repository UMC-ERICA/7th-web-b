import { useState } from "react";
import Card from "../components/card.jsx";
import * as S from "../movies.style.js";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMovies = async (query, currentPage) => {
  const token = import.meta.env.VITE_TMDB_TOKEN;
  const apiUrl = import.meta.env.VITE_TMDB_API_URL;

  const { data } = await axios.get(
    `${apiUrl}/${query}?language=ko-KR&page=${currentPage}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

const MoviesPage = ({ query }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movies", query, currentPage], // 쿼리 키
    queryFn: () => fetchMovies(query, currentPage), // 쿼리 함수
  });
  if (isLoading)
    return (
      <div>
        <h1>로딩 중...</h1>
      </div>
    );
  if (isError)
    return (
      <div>
        <h1>에러 입니다.</h1>
      </div>
    );
  return (
    <>
      <S.CardList>
        {movies?.results.map((movie) => {
          return <Card key={movie.id} movie={movie} />;
        }) || <p>영화가 없습니다.</p>}
      </S.CardList>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignContent: "center",
          fontSize: "1.9rem",
        }}
      >
        <StyledButton
          style={{
            backgroundColor: currentPage === 1 ? "gray" : "#f71161"
          }}
          disabled={currentPage == 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          이전
        </StyledButton>
        <p>{currentPage} 페이지</p>
        <StyledButton onClick={() => setCurrentPage((prev) => prev + 1)}>다음</StyledButton>
      </div>
    </>
  );
};

export default MoviesPage;

const StyledButton = styled.button`
  background-color: #f71161;
  color: white;
  font-size: 1.5rem;
  padding: 5px;
  border-radius: 15px;
`;
