import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./playMovie.module.css";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});

export default function index() {
  const router = useRouter();
  const movieId = router.query.movieId;
  const videos = [];
  const [key, setKey] = useState([]);

  const fetchTrailer = () => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=b7d4d62c7edae48d1014982bccd4635f`
    )
      .then((response) => {
        return response.json();
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const setVideoUrl = () => {
    Object.keys(videos).forEach((key) => {
      videos[key].map((video) => {
        if (video["type"] == "Trailer") {
          setKey(video["key"]);
          return;
        } else {
          setKey("");
        }
      });
    });
  };
  const noTrailerFound = () => {
    window.alert("Trailer not found.");
    history.back();
  };
  useEffect(() => {
    if (!router.isReady) return;
    fetchTrailer()
      .then((res) => {
        videos.push(res.results);
      })
      .then(() => {
        setVideoUrl();
      });
  }, [router]);
  return (
    <div className={styles.container}>
      {key ? (
        <ReactPlayer
          // url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          url={`https://www.youtube.com/watch?v=${key}`}
          playing={true}
          controls={true}
          height="100%"
          width="100%"
        />
      ) : (
        noTrailerFound()
      )}
      {/* <p>Hi {key}</p> */}
    </div>
  );
}
