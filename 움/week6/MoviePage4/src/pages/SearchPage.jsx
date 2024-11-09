import * as S from "./SearchPage.style.js";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch.js";
import MovieCard from '../components/MovieCard';

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams({ mq: '' });

  const mq = searchParams.get('mq');

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchMovie = () => {
    if (mq === searchValue) return;
    navigate(`/search?mq=${searchValue}`);
  };

  const handleSearchMovieWithKeyboard = (e) => {
    if (e.key === 'Enter') {
      handleSearchMovie();
    }
  };

  const url = `/search/movie?query=${searchValue}&include_adult=false&language=ko-KR&page=1`;
  const { data: movies, isLoading, isError } = useCustomFetch(url);

  return (
    <>
      <S.SearchContainer>
        <input
          placeholder="영화 제목을 입력해주세요"
          value={searchValue}
          onChange={onChangeSearchValue}
          onKeyDown={handleSearchMovieWithKeyboard}
        />
        <button onClick={handleSearchMovie}>검색</button>
      </S.SearchContainer>
      <div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occurred!</p>}
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              releaseDate={movie.release_date}
              posterPath={movie.poster_path}
            />
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </>
  );
};

export default SearchPage;
