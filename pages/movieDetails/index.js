import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "./movieDetails.module.css";
import { useRouter } from "next/router";

export default function index() {
  const router = useRouter();
  const movieId = router.query.movieId;
  const [movie, setMovie] = useState([]);
  const imageBaseUrl = "https://image.tmdb.org/t/p/";
  const imageSize = "w1280";

  const fetchMovie = () => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=b7d4d62c7edae48d1014982bccd4635f`
    )
      .then((response) => {
        return response.json();
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const logoClicked = () => {
    router.push("/");
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetchMovie().then((res) => {
      setMovie(res);
      console.log(res);
    });
  }, [router]);
  return (
    <div
      className={styles.container}
      style={{
        backgroundImage:
          "url(" + imageBaseUrl + imageSize + movie.backdrop_path + ")",
        backgroundSize: "100% 100%",
      }}
    >
      <Head>
        <title>Movies React App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
        <img
          onClick={logoClicked}
          className={styles.logo}
          src="https://fontmeme.com/permalink/230327/5edd1be1ee20090e9de67bbe7465bb2b.png"
        />
      </div>
      <main className={styles.mainContainer}>
        <div className={styles.subContainer}>
          {movie ? (
            <div className={styles.bgImg}>
              <h1 className={styles.title}>{movie.title}</h1>
              <p className={styles.overview}>{movie.overview}</p>
              <p className={styles.rating}>{movie.vote_average}</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </main>

      <style jsx>{`
        main {
          justify-content: center;
          width: 100%;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background: #000000;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          overflow-x: hidden;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
