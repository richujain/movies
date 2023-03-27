import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const imageBaseUrl = "https://image.tmdb.org/t/p/";
  const imageSize = "w500";
  let json = "";
  const fetchMovies = () => {
    return fetch(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=b7d4d62c7edae48d1014982bccd4635f"
    )
      .then((response) => {
        return response.json();
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    fetchMovies().then((res) => {
      setMovies(res.results);
    });
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Movies React App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
        <img
          className={styles.logo}
          src="https://fontmeme.com/permalink/230327/5edd1be1ee20090e9de67bbe7465bb2b.png"
        />
      </div>
      <main className={styles.mainContainer}>
        <div className={styles.subContainer}>
          <h3 className={styles.title}>Trending Now</h3>
          <div className={styles.list}>
            {movies.map((movie) => {
              console.log(movie);
              return (
                <div className={styles.item}>
                  <img
                    className={styles.movieImage}
                    src={`${imageBaseUrl}${imageSize}${movie.backdrop_path}`}
                  />
                  <h3 className={styles.movieTitle}>{movie.title}</h3>
                </div>
              );
            })}
          </div>
        </div>

        <h3 className={styles.title}>Movies</h3>
        <h3 className={styles.title}>TV Shows</h3>
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
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
