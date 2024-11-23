import Card from "../components/card.jsx";
import * as S from "../movies.style.js";
import SkeletonCard from "../components/SkeletonCard.jsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useCallback } from "react";

const fetchMovies = async ({ query, pageParam = 1 }) => {
  const token = import.meta.env.VITE_TMDB_TOKEN;
  const apiUrl = import.meta.env.VITE_TMDB_API_URL;

  const response = await axios.get(
    `${apiUrl}/${query}?language=ko-KR&page=${pageParam}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return { data: response.data, nextPage: pageParam + 1 };
};

const MoviesPage = ({ query }) => {
  const {
    data: movies,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies", query],
    queryFn: ({ pageParam = 1 }) => fetchMovies({ query, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const observer = useRef();
  //observer는 observer인스턴스 저장을 위해 선언해줘야 함
  const lastMovieElementRef = useCallback(
    (node) => {
      if (isLoading) return; // 로딩 중일 때는 아무것도 하지 않음
      if (observer.current)
        //observer.current에 값이 있다면,
        observer.current.disconnect(); // 이전 observer 해제

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage(); // 다음 페이지 로드
        }
      });

      if (node) observer.current.observe(node); // 새로운 노드 관찰
    },
    [isLoading, hasNextPage, fetchNextPage]
  );

  if (isLoading)
    return (
      <S.CardList>
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </S.CardList>
    );

  if (isError)
    return (
      <div>
        <h1>에러 입니다.</h1>
      </div>
    );

  return (
    <S.CardList>
      {movies?.pages.map((page) =>
        page.data.results.map((movie, index) => {
          if (page.data.results.length === index + 1) {
            return (
              <div ref={lastMovieElementRef} key={movie.id}>
                <Card movie={movie} />
              </div>
            );
          } else {
            return <Card key={movie.id} movie={movie} />;
          }
        })
      )}
    </S.CardList>
  );
};

export default MoviesPage;
