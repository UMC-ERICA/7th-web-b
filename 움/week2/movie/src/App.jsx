import React from 'react';
import './App.css';
import { MOVIES } from './mocks/movies';

function App() {
  return (
    <div className="movie-container">
      {MOVIES.results.slice(0, 20).map((movie) => (
        <div key={movie.id} className="movie-item">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
          <p className="movie-title">{movie.title}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
