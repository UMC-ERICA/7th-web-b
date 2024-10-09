import { MOVIES } from "./mocks/movies";
import styles from "./style.module.css";
const MoviePosters = () => {
  return (
    <div style={{
      display:"flex",
      flexWrap:"wrap",
      }}>
      {MOVIES.results.map((movie) => (
        <div key={movie.id}>
          <img
            style={{
              padding:"5px",
              borderRadius:"10px",
              filter: 'brightness(1)', 
              transition: 'filter 2s ease'
            }}
            onMouseOver={e => e.currentTarget.style.filter = 'brightness(0.5)'}
            onMouseOut={e => e.currentTarget.style.filter = 'brightness(1)'}
            src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
          />
        </div>
      ))}
    </div>
  );
};

export default MoviePosters;
