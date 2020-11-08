import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as moviesSelectors from 'resources/movies/movies.selectors';
import * as moviesActions from 'resources/movies/movies.actions';

import HeroArea from './hero-area';
import MovieList from './movie-list';

function Home(props) {
  const dispatch = useDispatch();

  const selectedMovie = useSelector(moviesSelectors.getSelectedMovie);

  // task 5 
  const setSelectedMovie = useCallback((movieId) => {
    dispatch(moviesActions.selectMovie(movieId));
  }, [dispatch])

  useEffect(() => {
    const { movieId } = props.match.params;
    setSelectedMovie(movieId)
  }, [props.match.params, setSelectedMovie]);


  return (
    <div>
      <HeroArea movie={selectedMovie} />
      <MovieList />
    </div>
  );
}

export default Home;
