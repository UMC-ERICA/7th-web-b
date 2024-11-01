import Card from "../components/card.jsx";
import { useEffect, useState } from "react";
import * as S from "../movies.style.js";
import useCustomFetch from "../hooks/useCustomFetch.js";

const MoviesPage = ({ query }) => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch(`/${query}?&language=ko-KR&page=1`);
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
        })}
      </S.CardList>
    </>
  );
};

export default MoviesPage;
