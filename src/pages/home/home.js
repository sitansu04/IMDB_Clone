import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import Movielist from "../../components/movielist/movielist";

const Home = () => {
  const [popularMovies, setpopularMovies] = useState([]);
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=f98222b887f77579138937dd88c24ea0&language=en-US"
    )
      .then((res) => res.json())
      .then((data) => setpopularMovies(data.results));
  }, []);
  return (
    <>
      <Carousel
        showThumbs={false}
        autoPlay={true}
        transitionTime={3}
        infiniteLoop={true}
        showStatus={false}
      >
        {popularMovies.map((movie) => (
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`/movie/${movie.id}`}
          >
            <div className="posterImage">
              <img
                src={`https://image.tmdb.org/t/p/original${
                  movie && movie.backdrop_path
                }`}
              />
            </div>
            <div className="posterImage__overlay">
              <div className="posterImage__title">
                {movie ? movie.original_title : ""}
              </div>
              <div className="posterImage__runtime">
                {movie ? movie.release_date : ""}
                <span className="posterImage__rating">
                  {movie ? movie.vote_average : ""}
                  <i
                    class="fa-solid fa-star"
                    style={{ color: "#fbff00" }}
                  ></i>{" "}
                </span>
              </div>
              <div className="posterImage__description">
                {movie ? movie.overview : ""}
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
      <Movielist />
    </>
  );
};

export default Home;
