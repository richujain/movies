import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const [trending, setTrending] = useState([]);
  const [movies, setMovies] = useState([]);
  const [tvshows, setTvshows] = useState([]);
  const [searchResults, setSearchResults] = useState("");
  const [searchTitle, setSearchTitle] = useState([]);
  const imageBaseUrl = "https://image.tmdb.org/t/p/";
  const imageSize = "w1280";
  const child = { width: `300em`, height: `100%` };
  let json = "";
  const moviesRef = useRef();
  const trendingRef = useRef();
  const tvShowsRef = useRef();
  const searchingRef = useRef();

  const fetchTrending = () => {
    return fetch(
      "https://api.themoviedb.org/3/trending/all/week?api_key=b7d4d62c7edae48d1014982bccd4635f"
    )
      .then((response) => {
        return response.json();
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const fetchMovies = () => {
    return fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=b7d4d62c7edae48d1014982bccd4635f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"
    )
      .then((response) => {
        return response.json();
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const fetchTvshows = () => {
    return fetch(
      "https://api.themoviedb.org/3/discover/tv?api_key=b7d4d62c7edae48d1014982bccd4635f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"
    )
      .then((response) => {
        return response.json();
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const scrollForSearch = () => {
    const el = searchingRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "instant",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  };
  const scrollForTrending = () => {
    const el = trendingRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "instant",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  };
  const scrollForMovies = () => {
    const el = moviesRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "instant",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  };
  const scrollForTvShows = () => {
    const el = tvShowsRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "instant",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  };

  const onMovieClicked = (movieId) => {
    console.log("movieId: " + movieId);
    router.push({
      pathname: "/movieDetails",
      query: { movieId: movieId },
    });
  };
  const handleChange = (event) => {
    setSearchTitle(event.target.value);
    if (searchTitle)
      searchInDatabase().then((res) => {
        setSearchResults(res.results);
        console.log(res.results);
      });
    else setSearchResults("");
  };
  const searchMovies = (event) => {
    if (event.key === "Enter") {
      console.log(searchTitle);
      if (searchTitle)
        searchInDatabase().then((res) => {
          setSearchResults(res.results);
          console.log(res.results);
        });
      else setSearchResults("");
    }
  };
  const searchInDatabase = () => {
    return fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=b7d4d62c7edae48d1014982bccd4635f&language=en-US&sort_by=popularity.desc&include_adult=false&query=${searchTitle}`
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    setSearchResults("");
    setSearchTitle("");
    fetchTrending().then((res) => {
      setTrending(res.results);
    });
    fetchMovies().then((res) => {
      setMovies(res.results);
    });
    fetchTvshows().then((res) => {
      setTvshows(res.results);
    });
    // ------------------
    scrollForTrending();
    scrollForMovies();
    scrollForTvShows();
    scrollForSearch();
    // ------------------
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Movies React App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
        <img
          onClick={() => router.push("/")}
          className={styles.logo}
          src="https://fontmeme.com/permalink/230327/5edd1be1ee20090e9de67bbe7465bb2b.png"
        />
        <input
          type="text"
          className={styles.search}
          placeholder="Enter Title"
          onChange={handleChange}
          value={searchTitle}
          onKeyDown={searchMovies}
        />
        {/* <img
          className={styles.logo}
          src="https://fontmeme.com/permalink/230327/5edd1be1ee20090e9de67bbe7465bb2b.png"
        /> */}
      </div>
      <main className={styles.mainContainer}>
        {searchResults && searchTitle ? (
          <div className={styles.subContainer}>
            <h3 className={styles.title}>SearchResults</h3>
            <div className={styles.list} ref={searchingRef}>
              {searchResults.map((movie) => {
                return (
                  <div
                    className={styles.item}
                    key={movie.id}
                    onClick={() => onMovieClicked(movie.id)}
                  >
                    <img
                      className={styles.movieImage}
                      src={`${imageBaseUrl}${imageSize}${movie.backdrop_path}`}
                    />
                    <h3 className={styles.movieTitle}>
                      {movie.title ? movie.title : movie.name}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
        {!searchTitle ? (
          <>
            <div className={styles.subContainer}>
              <h3 className={styles.title}>Trending Now</h3>

              <div className={styles.list} ref={trendingRef}>
                {trending.map((movie) => {
                  return (
                    <div
                      className={styles.item}
                      key={movie.id}
                      onClick={() => onMovieClicked(movie.id)}
                    >
                      <img
                        className={styles.movieImage}
                        src={`${imageBaseUrl}${imageSize}${movie.backdrop_path}`}
                      />
                      <h3 className={styles.movieTitle}>
                        {movie.title ? movie.title : movie.name}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.subContainer}>
              <h3 className={styles.title}>Movies</h3>
              <div className={styles.list} ref={moviesRef}>
                {movies.map((movie) => {
                  return (
                    <div
                      className={styles.item}
                      key={movie.id}
                      onClick={() => onMovieClicked(movie.id)}
                    >
                      <img
                        className={styles.movieImage}
                        src={`${imageBaseUrl}${imageSize}${movie.backdrop_path}`}
                      />
                      <h3 className={styles.movieTitle}>
                        {movie.title ? movie.title : movie.name}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.subContainer}>
              <h3 className={styles.title}>TV Shows</h3>
              <div className={styles.list} ref={tvShowsRef}>
                {tvshows.map((movie) => {
                  return (
                    <div
                      className={styles.item}
                      key={movie.id}
                      onClick={() => onMovieClicked(movie.id)}
                    >
                      <img
                        className={styles.movieImage}
                        src={`${imageBaseUrl}${imageSize}${movie.backdrop_path}`}
                      />
                      <h3 className={styles.movieTitle}>
                        {movie.title ? movie.title : movie.name}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
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
