import React, { useState } from "react";
import { useSelector } from "react-redux";

import Filters from "./filters";
import MovieItem from "./movie-item";

import * as moviesSelectors from "resources/movies/movies.selectors";

import { GENRES, SORT_OPTIONS } from "constants/movie-filters";

import styles from "./movie-list.module.scss";

function MovieList() {
  // callback like parametre  move_list property (destrcture)
  const { movie_list } = useSelector(moviesSelectors.getMovies);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const [genre, setGenre] = useState(GENRES[0]);

  return (
    <div className={styles.container}>
      <Filters
        filterOptions={GENRES}
        sortOptions={SORT_OPTIONS}
        filter={genre}
        sortBy={sortBy}
        onSelectFilter={setGenre}
        onSelectSort={setSortBy}
      />
      <div className={styles.content}>
        <div className={styles.count}>
          {movie_list.length} movie{movie_list.length > 1 && "s"} found
        </div>
        <div className={styles.list}>
          {movie_list.map((item) => (
            <MovieItem key={item.id} movie={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieList;
