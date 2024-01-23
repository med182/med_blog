// ApiPage.js
import React, { useState, useEffect } from "react";
import { getUpcomingMovies } from "../api/tmdbApi";

const ApiPage = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const movies = await getUpcomingMovies();
        setUpcomingMovies(movies);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };

    fetchUpcomingMovies();
  }, []);

  return (
    <div className="api-page">
      <h2>Films à venir...</h2>
      <ul>
        {upcomingMovies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ApiPage;
