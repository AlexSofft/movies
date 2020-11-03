import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

import AddMovieModal from 'components/add-movie-modal';

import * as movieActions from 'resources/movies/movies.actions';
import { DEFAULT_DATE_FORMAT } from 'constants/date-formats';

import backgroundImage from 'img/movies.png';

import styles from './hero-area.module.scss';

const MAX = 999999;
const MIN = 100000

function HeroArea(props) {
  const dispatch = useDispatch();

  const [searchString, setSearchString] = useState('');
  const [isAddMovieModalOpened, setIsAddMovieModalOpened] = useState(false);

  const onOpenAddMovieModal = () => {
    setIsAddMovieModalOpened(true);
  }

  const onCloseAddMovieModal = () => {
    setIsAddMovieModalOpened(false);
  }

  const onSubmit = (data) => {
    const movie = {
      ...data,
      id: Math.random() * (MAX - MIN) + MIN,
      release_date: moment(data.release_date).format(DEFAULT_DATE_FORMAT),
    };

    dispatch(movieActions.addMovie(movie));
    setIsAddMovieModalOpened(false);
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
            <Button size="lg" variant="light" className={styles.addButton} onClick={onOpenAddMovieModal}>+ Add movie</Button>
          </div>

          <div className={styles.content}>
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
                <Button size="lg" variant="primary" className={styles.searchButton}>Search</Button>
              </div>
            </div>
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
