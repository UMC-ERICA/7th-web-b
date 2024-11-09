import { useParams } from "react-router-dom";
import styled from "styled-components";
import unknownImage from "../assets/unknown.jpg";
import useCustomFetch from "../hooks/useCustomFetch.js";

const MovieDetail = () => {
  const { id } = useParams();
  const {
    data: movie,
    isLoading,
    isError,
  } = useCustomFetch(`/${id}?&append_to_response=credits&language=ko-KR`);
  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 입니다.</div>;
  return (
    <>
      <StyledMovieDetailContainer>
        <StyledMovieDetailImage
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
          }}
        >
          <h1 style={{ top: "5%" }}>{movie?.title}</h1>
          <h4 style={{ top: "13%" }}>평균 : {movie?.vote_average}</h4>
          <h4 style={{ top: "17%" }}>{movie?.release_date.slice(0, 4)}</h4>
          <h4 style={{ top: "21%" }}>{movie?.runtime}분</h4>
          <div
            style={{
              position: "absolute",
              top: "28%",
              left: "3%",
              fontStyle: "italic",
              fontSize: "1.5rem",
            }}
          >
            {movie?.tagline ? `"${movie?.tagline}"` : ""}
          </div>
          <StyledMovieDetailOverview>
            {movie?.overview}
          </StyledMovieDetailOverview>
        </StyledMovieDetailImage>
        <h1>감독/출연</h1>
      </StyledMovieDetailContainer>
      <StyledMovieDetailCredits>
        {movie?.credits.crew
          .filter((crew) => crew.department === "Directing")
          .map((crew) => (
            <StyledCreditCharacter key={crew.id}>
              <img
                src={
                  crew.profile_path
                    ? `https://image.tmdb.org/t/p/w92${crew.profile_path}`
                    : unknownImage
                }
                alt={crew.name}
              />
              <div>{crew.name}</div>
              <div
                style={{
                  opacity: 0.5,
                }}
              >
                {crew.department}
              </div>
            </StyledCreditCharacter>
          ))}
        {movie?.credits.cast.map((cast) => (
          <StyledCreditCharacter key={cast.id}>
            <img
              src={
                cast.profile_path
                  ? `https://image.tmdb.org/t/p/w92${cast.profile_path}`
                  : unknownImage
              }
              alt={cast.name}
            />
            <div key={cast.id}>{cast.name}</div>
            <div
              style={{
                opacity: 0.5,
              }}
            >
              {cast.character}
            </div>
          </StyledCreditCharacter>
        ))}
      </StyledMovieDetailCredits>
    </>
  );
};

const StyledMovieDetailContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 15px;
`;

const StyledMovieDetailImage = styled.div`
  width: 100%;
  height: 500px;
  background-size: cover;
  object-fit: cover;
  border-radius: 10px;
  h1 {
    position: absolute;
    left: 3%;
  }
  h4 {
    position: absolute;
    left: 3%;
  }
`;
const StyledMovieDetailOverview = styled.div`
  position: absolute;
  top: 38%;
  left: 3%;
  width: 40%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 10px;
`;
const StyledMovieDetailCredits = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
  margin: 15px;
`;
const StyledCreditCharacter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;

  img {
    width: 92px;
    height: 92px;
    border-radius: 50%;
  }

  div {
    font-size: 12px;
    text-align: center;
  }
`;
export default MovieDetail;
