import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieListPage from '../components/MovieListPage';

const Home = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios
            .get('https://api.themoviedb.org/3/movie/now_playing', {
                params: { api_key: 'de78f3589204f34063fb666ed535b7ca', language: 'ko-KR' },
            })
            .then(response => setMovies(response.data.results))
            .catch(error => console.error(error));
    }, []);

    return <MovieListPage movies={movies} />;
};

export default Home;