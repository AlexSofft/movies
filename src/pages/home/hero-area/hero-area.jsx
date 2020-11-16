import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import cn from 'classnames';
import moment from 'moment';

import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import { Search } from 'react-bootstrap-icons';

import AddMovieModal from 'components/add-movie-modal';

import * as movieActions from 'resources/movies/movies.actions';
import * as moviesSelectors from 'resources/movies/movies.selectors';
import { DEFAULT_DATE_FORMAT } from 'constants/date-formats';
import { formatSearchText } from 'helpers/regexp';
import useUpdateEffect from 'hooks/useUpdateEffect';

import backgroundImage from 'img/movies.png';

import styles from './hero-area.module.scss';

const MAX = 999999;
const MIN = 100000;

function HeroArea(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { movie_list } = useSelector(moviesSelectors.getMovies);
  const { movie } = props;

  const [searchString, setSearchString] = useState('');
  const [isAddMovieModalOpened, setIsAddMovieModalOpened] = useState(false);

   // task 5 custom hook
  useUpdateEffect(() => {
    setSearchString('');
  }, [movie]);

  const onOpenAddMovieModal = () => {
    setIsAddMovieModalOpened(true);
  }

  const onCloseAddMovieModal = () => {
    setIsAddMovieModalOpened(false);
  }

  const onSubmit = (data) => {
    const movie = {
      ...data,
      id: `${Math.random() * (MAX - MIN) + MIN}`,
      release_date: moment(data.release_date).format(DEFAULT_DATE_FORMAT),
    };

    dispatch(movieActions.addMovie(movie));
    setIsAddMovieModalOpened(false);
  }

  const onDeselectMovie = () => {
    history.push('/');
  }

  const onSearchClick = () => {
    const searchRegExp = new RegExp(formatSearchText(searchString) , 'i');

    const result = movie_list.find(movie => {
      return searchRegExp.test(movie.title) || searchRegExp.test(movie.overview) ||  searchRegExp.test(movie.tagline);
    });

    if (result) {
      history.push(`${result.id}`);
    }
  }

  const renderForm = () => {
    return (
      <div className={styles.form}>
        <div className={styles.title}>
          Find your movie
        </div>
        <div className={styles.search}>
          <FormControl
            placeholder="What do you want to watch"
            value={searchString}
            onChange={(event) => setSearchString(event.target.value)}
          />
          <Button size="lg" variant="primary" className={styles.searchButton} onClick={onSearchClick}>Search</Button>
        </div>
      </div>
    );
  }

  const renderMovieDetails = () => {
    return (
      <div className={styles.movie}>
        <img className={styles.poster} src={movie.poster_path} alt={movie.title} />

        <div className={styles.details}>
          <div className={styles.movieTitle}>
            <div className={styles.text}>{movie.title}</div>
            <div className={cn(styles.rating, { [styles.good]: movie.vote_average > 5 })}>{movie.vote_average}</div>
          </div>
          <div className={styles.tagline}>{movie.tagline}</div>

          <div className={styles.numbers}>
            <div>{movie.release_date.split('-')[0]}</div>
            <div className={styles.duration}>{movie.runtime} min</div>
          </div>

          <div className={styles.overview}>
            {movie.overview}
          </div>
        </div>
      </div>
    )
  }

  const renderActionButton = () => {
    if (movie) {
      return (
        <Search className={styles.icon} onClick={onDeselectMovie} />
      );
    }

    return (
      <Button size="lg" variant="light" className={styles.addButton} onClick={onOpenAddMovieModal}>+ Add movie</Button>
    );
  }

  return (
    <>
    <div className={styles.page}>
      <div className={styles.top}>
        <div className={styles.background}>
          <img className={styles.backgroundImage} src={backgroundImage} alt="" />
          <div className={styles.shadow} />
        </div>

        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <strong>netflix</strong>
              <span>roulette</span>
            </div>
            {renderActionButton()}
          </div>

          <div className={styles.content}>
            {props.movie ? renderMovieDetails() : renderForm()}
          </div>
        </div>
      </div>
    </div>

    {isAddMovieModalOpened && <AddMovieModal onSubmit={onSubmit} onClose={onCloseAddMovieModal} />}
    </>
  );
}

HeroArea.propTypes = {
  movie: PropTypes.shape({}),
}

HeroArea.defaultProps = {
  movie: undefined,
}

export default HeroArea;
