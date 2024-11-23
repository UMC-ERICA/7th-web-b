import * as S from "./SearchPage.style.js";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch.js";
import MovieCard from '../components/MovieCard';
import SearchMovieList from "./SearchMovieList.jsx";
import { debounce } from 'lodash';

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams({ mq: '' });
  const mq = searchParams.get('mq');

  // Debounced function for handling search navigation
  const debouncedSearch = debounce((value) => {
    if (mq !== value) {
      navigate(`/search?mq=${value}`);
    }
  }, 300); // 300ms delay for debounce

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
    debouncedSearch(event.target.value); // Run debounced search
  };

  const handleSearchMovieWithKeyboard = (e) => {
    if (e.key === 'Enter') {
      debouncedSearch(searchValue); // Run debounced search on Enter key
    }
  };

  const url = `/search/movie?query=${searchValue}&include_adult=false&language=ko-KR&page=1`;
  const { data: movies, isLoading, isError } = useCustomFetch(url);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel(); // Cancel debounced calls on unmount
    };
  }, [debouncedSearch]);

  return (
    <>
      <S.SearchContainer>
        <input
          placeholder="영화 제목을 입력해주세요"
          value={searchValue}
          onChange={onChangeSearchValue}
          onKeyDown={handleSearchMovieWithKeyboard}
        />
        <button onClick={() => debouncedSearch(searchValue)}>검색</button>
      </S.SearchContainer>
      <SearchMovieList />
    </>
  );
};

export default SearchPage;


// import * as S from "./SearchPage.style.js";
// import { useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import useCustomFetch from "../hooks/useCustomFetch.js";
// import MovieCard from '../components/MovieCard';
// import SearchMovieList from "./SearchMovieList.jsx";

// const SearchPage = () => {
//   const [searchValue, setSearchValue] = useState('');
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams({ mq: '' });

//   const mq = searchParams.get('mq');

//   const onChangeSearchValue = (event) => {
//     setSearchValue(event.target.value);
//   };

//   const handleSearchMovie = () => {
//     if (mq === searchValue) return;
//     navigate(`/search?mq=${searchValue}`);
//   };

//   const handleSearchMovieWithKeyboard = (e) => {
//     if (e.key === 'Enter') {
//       handleSearchMovie();
//     }
//   };

//   const url = `/search/movie?query=${searchValue}&include_adult=false&language=ko-KR&page=1`;
//   const { data: movies, isLoading, isError } = useCustomFetch(url);

//   return (
//     <>
//       <S.SearchContainer>
//         <input
//           placeholder="영화 제목을 입력해주세요"
//           value={searchValue}
//           onChange={onChangeSearchValue}
//           onKeyDown={handleSearchMovieWithKeyboard}
//         />
//         <button onClick={handleSearchMovie}>검색</button>
//       </S.SearchContainer>
//       <SearchMovieList/>
//     </>
//   );
// };

// export default SearchPage;
