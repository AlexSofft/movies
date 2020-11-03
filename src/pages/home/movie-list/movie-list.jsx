import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Filters from './filters';
import MovieItem from './movie-item';

import * as moviesSelectors from 'resources/movies/movies.selectors';

import { GENRES, SORT_OPTIONS } from 'constants/movie-filters';

import styles from './movie-list.module.scss';

function MovieList() {  
  const { movie_list } = useSelector(moviesSelectors.getMovies)
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const [genre, setGenre] = useState(GENRES[0]);

  const sortMovies = (a, b) => {
    return a[sortBy.key] > b[sortBy.key] ? 1 : -1;
  }

  const filterMovies = (movie) => {
    if (genre.key === 'all') {
      return true; 
    };
    return movie.genres.includes(genre.key);
  }

  const renderContent = () => {
    const movies = movie_list.slice().filter(filterMovies).sort(sortMovies);

    if (movies.length) {
      return (
        <>
          <div className={styles.count}>
            {movie_list.length} movie{movie_list.length > 1 && 's'} found
          </div>
          <div className={styles.list}>
            { movies.map(item => <MovieItem key={item.id} movie={item} />) }
          </div>
        </>
      );
    } else {
      return (
        <div className={styles.placeholder}>
          <div className={styles.text}>
            Didn't found any results, try to apply different filters
          </div>
        </div>
      )
    }
  }

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
        { renderContent() }
      </div>
    </div>
  )
}

export default MovieList;
