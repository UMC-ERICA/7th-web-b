import styled from "styled-components";
const Card = ({ movie }) => {
  return (
    <StyledCard>
      {console.log(movie)}
      <img id={movie.id} src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} alt={movie.title} />
      <h5>{movie.title}</h5>
      <h6>{movie.release_date}</h6>
    </StyledCard> 
  );
};

export default Card;


const StyledCard = styled.div`
  width: 92px;
  margin: 10px;

  img {
    border-radius: 8px;
  }

  h5 {
    margin: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 92px;
  }

  h6 {
    margin: 0;
  }
`




