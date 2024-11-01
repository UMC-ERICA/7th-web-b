import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const NowPlaying = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios
            .get('https://api.themoviedb.org/3/movie/now_playing', {
                params: { api_key: 'de78f3589204f34063fb666ed535b7ca', language: 'ko-KR' },
            })
            .then(response => setMovies(response.data.results))
            .catch(error => console.error(error));
    }, []);

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
            padding: '20px'
        }}>
            {movies.map(movie => (
                <MovieCard
                    key={movie.id}
                    title={movie.title}
                    releaseDate={movie.release_date}
                    posterPath={movie.poster_path}
                />
            ))}
        </div>
    );
};

export default NowPlaying;







// import React from "react";
// import useCustomFetch from "../hooks/useCustomFetch";
// import MovieCard from "../components/MovieCard";

// const Home = () => {
//     // 커스텀 훅을 통해 인기 영화 데이터를 가져옴
//     const { data, isLoading, isError } = useCustomFetch(`/movie/popular?language=ko-KR`);

//     // 로딩 중일 때 표시
//     if (isLoading) return <p>Loading...</p>;

//     // 에러가 발생했을 때 표시
//     if (isError) return <p>Error loading data.</p>;

//     return (
//         <div>
//             <h2>인기 영화</h2>
//             <div>
//                 {/* 데이터가 있는 경우에만 영화 목록을 표시 */}
//                 {data?.results?.map((movie) => (
//                     <MovieCard 
//                         key={movie.id} 
//                         title={movie.title} 
//                         releaseDate={movie.release_date} 
//                         posterPath={movie.poster_path} 
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Home;



// // import React, { useState, useEffect } from "react";
// // // import * as S from "./home.style.js";
// // import MovieCard from "../components/MovieCard";
// // import { axiosInstance } from "../apis/axios-instance";
// // import useCustomFetch from "../hooks/useCustomFetch";

// // const Home = () => {
// //     const {data, isLoading, isError} = useCustomFetch(`/movie/popular?language=ko-KR`);
// //     console.log(data);

// //     return (
// //         <S.CardList>
// //             {/* {movies.results?.map((movie) => (
// //                 <MovieCard key={movie.id} movie={movie} />
// //             ))} */}
// //         </S.CardList>
// //     );
// // };

// // export default Home;


// // import React from 'react';

// // const Home = () => (
// //   <div>
// //     <h2>홈 페이지</h2>
// //   </div>
// // );

// // export default Home;
