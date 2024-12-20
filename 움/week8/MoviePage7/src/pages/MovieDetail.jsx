import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import MovieCard from '../components/MovieCard';

// 스타일 정의
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #fff;
`;

const Header = styled.div`
  display: flex;
  gap: 20px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: calc(100% - 320px);
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 0;
`;

const Overview = styled.p`
  margin-top: 10px;
  font-size: 1rem;
  line-height: 1.5;
`;

const Credits = styled.div`
  margin-top: 20px;
`;

// MovieDetail 컴포넌트 정의
const MovieDetail = () => {
  const { movieId } = useParams(); // URL에서 movieId 추출
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    // 영화 상세 정보 요청
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          params: { api_key: 'de78f3589204f34063fb666ed535b7ca', language: 'ko-KR' },
        });
        setMovie(movieResponse.data);

        // 영화 크레딧 정보 요청
        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          params: { api_key: 'de78f3589204f34063fb666ed535b7ca', language: 'ko-KR' },
        });
        setCredits(creditsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie || !credits) return <p>Loading...</p>;

  return (
    <Container>
      <Header>
      <MovieCard
          id={movie.id}
          title={movie.title}
          releaseDate={movie.release_date}
          posterPath={movie.poster_path}
        />
        <Info>
          <Title>{movie.title}</Title>
          <p>개봉일: {movie.release_date}</p>
          <p>평점: {movie.vote_average}</p>
          <Overview>{movie.overview}</Overview>
        </Info>
      </Header>
      <Credits>
        <h3>감독 및 출연진</h3>
        <ul>
          {credits.crew
            .filter(member => member.job === 'Director')
            .map(director => (
              <li key={director.id}>감독: {director.name}</li>
            ))}
          {credits.cast.slice(0, 5).map(actor => (
            <li key={actor.id}>출연: {actor.name} - {actor.character}</li>
          ))}
        </ul>
      </Credits>
    </Container>
  );
};

export default MovieDetail;