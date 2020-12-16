import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

import Filters from './filters';
import MovieItem from './movie-item';

import * as moviesSelectors from 'resources/movies/movies.selectors';
import * as moviesActions from 'resources/movies/movies.actions';

import { GENRES, SORT_OPTIONS } from 'constants/movie-filters';

import styles from './movie-list.module.scss';

function MovieList() {  
  const dispatch = useDispatch();

  const { data, totalAmount, offset, limit, sortBy, filter, searchBy, search } = useSelector(moviesSelectors.getMovies);
  const [sort, setSort] = useState(sortBy);
  const [genre, setGenre] = useState(filter);

  const loadMovieList = async (offsetParam) => {
    const options = {
      limit,
      offset: offsetParam !== undefined ? offsetParam : offset,
      sortBy: sort.key,
      sortOrder: 'desc',
      filter: genre.key !== GENRES[0].key ? genre.key : '',
      searchBy,
      search,
    };
    dispatch(await moviesActions.getMovieList(options));
  }

  useEffect(() => {
    loadMovieList();
  }, []);

  useEffect(() => {
    loadMovieList(0);
  }, [sort, genre])

  const onNextPage = async () => {
    if (offset >= totalAmount - limit) {
      return;
    }

    dispatch(await moviesActions.getMovieList({ offset: offset + limit, limit }));
  }

  const onPreviousPage = async () => {
    if (offset === 0) {
      return;
    }

    dispatch(await moviesActions.getMovieList({ offset: offset -  limit, limit }));
  }

  const renderContent = () => {
    if (data.length) {
      return (
        <>
          <div className={styles.count}>
            {totalAmount} movie{totalAmount > 1 && 's'} found
          </div>
          <div className={styles.list}>
            { data.map(item => <MovieItem key={item.id} movie={item} />) }
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
        sortBy={sort}
        onSelectFilter={setGenre}
        onSelectSort={setSort}
      />
      <div className={styles.content}>
        { renderContent() }
      </div>
      <div className={styles.navigation}>
        <ChevronLeft onClick={onPreviousPage} />
        <ChevronRight onClick={onNextPage} />
      </div>
    </div>
  )
}

export default MovieList;
