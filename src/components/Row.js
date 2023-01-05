import React, { useState, useEffect } from "react";
import "./Row.css";
import axios from "./axios";
import "./Modal.css";
import ReactPlayer from "react-player";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  //console.log(movies);
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map(
          (movie) =>
            //To avoid dead links
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.poster_path)) && (
              //To render imageList
              <img
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                key={movie.id}
                onClick={toggleModal}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            )
        )}
        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <h2>NetFlix Clone</h2>
              <div className="Modal__Content">
                <ReactPlayer
                  width="480px"
                  height="240px"
                  controls
                  className="VideoPlayer__Container"
                  url="https://youtu.be/pMZPTnWpaWk"
                  onError={() => {
                    console.log("Error Occured!");
                  }}
                />
                <p>
                  Netflix is a streaming service that offers a wide variety of
                  award-winning TV shows, movies, anime, documentaries, and more
                  on thousands of internet-connected devices. You can watch as
                  much as you want, anytime, anywhere, without ad breaks.
                  Netflix has something for everyone. It is available in over
                  190 countries around the world and has over 208 million
                  subscribers. The company was founded in 1997 and has been
                  revolutionizing the entertainment industry ever since.
                </p>
              </div>
              <button className="close-modal" onClick={toggleModal}>
                X
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Row;
