import * as S from "./SearchPage.style.js";
import useCustomFetch from "../hooks/useCustomFetch.js";
import MovieCard from "../components/MovieCard.jsx";
import { useSearchParams } from "react-router-dom";
import MovieCardListSkeleton from "../components/MovieCardListSkeleton.jsx";

const SearchMovieList = () => {
  const [searchParams, setSearchParams] = useSearchParams({ mq: "" });
  const mq = searchParams.get("mq");
  const url = `/search/movie?query=${mq}&include_adult=false&language=ko-KR&page=1`;
  const { data: movies, isLoading, isError } = useCustomFetch(url);

  if (isError) {
    return <h2 style={{color: 'white'}}>에러 발생</h2>
  }

  if (isLoading) {
    return (
        <S.MovieGridContainer>
            <MovieCardListSkeleton number={20}/>
        </S.MovieGridContainer>
    )
  }

  if (mq && movies.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <h2 style={{ color: "white" }}>검색어 {mq}에</h2>
        <h2 style={{ color: "white" }}>해당하는 데이터가 없습니다.</h2>
      </div>
    );
  }

  console.log(movies);
  return (
    <S.MovieGridContainer>
      {movies.length > 0 &&
        movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            releaseDate={movie.release_date}
            posterPath={movie.poster_path}
          />
        ))}
    </S.MovieGridContainer>
  );
};

export default SearchMovieList;
