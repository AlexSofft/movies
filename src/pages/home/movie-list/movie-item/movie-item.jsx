import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import moment from 'moment';

import Dropdown from 'react-bootstrap/Dropdown';
import { ThreeDotsVertical } from 'react-bootstrap-icons';

import MovieModal from 'components/add-movie-modal';
import ConfirmModal from 'components/confirm-action-modal';

import * as movieActions from 'resources/movies/movies.actions';
import { DEFAULT_DATE_FORMAT } from 'constants/date-formats';

import styles from './movie-item.module.scss';

function MovieItem(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { movie } = props;

  const [showErrorComponent, setShowErrorComponent] = useState(false);
  const [isEditMovieModalOpened, setIsEditMovieModalOpened] = useState(false);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);

  const onCloseModal = () => {
    setIsEditMovieModalOpened(false);
  }

  const onOpenModal = () => {
    setIsEditMovieModalOpened(true);
  }

  const onCloseConfirmModal = () => {
    setIsDeleteModalOpened(false);
  }

  const onOpenConfirmModal = () => {
    setIsDeleteModalOpened(true);
  }

  const onDelete = () => {
    dispatch(movieActions.deleteMovie(movie.id));
    onCloseConfirmModal();
  }

  const onSubmit = (data) => {
    const movieToUpdate = {
      ...data,
      release_date: moment(data.release_date).format(DEFAULT_DATE_FORMAT),
    }
    dispatch(movieActions.editMovie(movie.id, movieToUpdate));
    onCloseModal();
  }

  const onSelectMovie = () => {
    history.push(`${movie.id}`);
  };

  const throwExampleError = () => {
    setShowErrorComponent(true);
  }

  const renderErrorComponent = () => {
    throw Error('error');
  };

  return (
    <div className={styles.container}>
      <img className={styles.poster} src={movie.poster_path} alt={movie.title} onClick={onSelectMovie} />
      <div className={styles.description}>
        <div className={styles.title}>{movie.title}</div>
        <div className={styles.releaseDate}>{movie.release_date.split('-')[0]}</div>
      </div>
      <div className={styles.genres}>
        {movie.genres.map((item, index) => (
          <div key={item}>
          {index !== 0 && <span>, </span>}
          <span>{item}</span>
          </div>
        ))}
      </div>

      <div className={styles.dropdown}>
        <Dropdown>
        <Dropdown.Toggle split className={styles.dropdownTitle}>
          <div className={styles.icon}>
            <ThreeDotsVertical />
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu alignRight className={styles.dropdownMenu}>
          <Dropdown.Item
            className={styles.dropdownItem}
            onClick={onOpenModal}
          >
            Edit
          </Dropdown.Item>
          <Dropdown.Item
            className={styles.dropdownItem}
            onClick={onOpenConfirmModal}
          >
            Delete
          </Dropdown.Item>
          <Dropdown.Item
            className={styles.dropdownItem}
            onClick={throwExampleError}
          >
            Error Boundary
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </div>

      {showErrorComponent && renderErrorComponent()}
      {isEditMovieModalOpened && <MovieModal movie={movie} onSubmit={onSubmit} onClose={onCloseModal} />}
      {isDeleteModalOpened && (
        <ConfirmModal
          title="Delete movie"
          text="Are you sure you want to delete this movie"
          onCancel={onCloseConfirmModal}
          onConfirm={onDelete}
        />
      )}
    </div>
  );
}

MovieItem.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
}

export default MovieItem;
