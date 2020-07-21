import React, { useState, useEffect } from "react";
import axios from "./axios";
import movieTrailer from "movie-trailer";
import "./Row.css";
import Youtube from "react-youtube";
const baseUrl = "https://image.tmdb.org/t/p/original/";

function Rows({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          console.log(setTrailerUrl);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      //console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  // console.log(movies);
  //if bracket[] is empty,run once when row loads and dont run again
  // if bracket []is field by any variable of state then tbis will run once when row loads and ever time movies variable changes.
  // whenever u use any variable which is defined outside useEffect u must have to write in [] brackets.
  const opts = {
    height: "390px",
    width: "100%",
    playersVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Rows;
