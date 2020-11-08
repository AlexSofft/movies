import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import moment from 'moment';
import { pick } from 'lodash';

import Modal from 'react-bootstrap/Modal';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import DatePicker from 'components/date-picker';
import Button from 'react-bootstrap/Button';
import { Check, X } from 'react-bootstrap-icons';

import { GENRES } from 'constants/movie-filters';

import styles from './add-movie-modal.module.scss';

const FIELD_REQUIRED_ERROR = 'Field is required';

 // task 5 was made fanctional
function AddMovieModal(props) {
   // task 5
  const initialData = useRef({
    title: '',
    release_date: undefined,
    poster_path: '',
    genres: [],
    overview: '',
    runtime: '',
  });

  const { onSubmit, onClose } = props;

  const [data, setData] = useState(initialData.current);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.movie) {
      const requiredFields = ['title', 'release_date', 'poster_path', 'genres', 'overview', 'runtime']
      const movie = pick(props.movie, requiredFields);
      const data = {
        ...movie,
        release_date: moment(movie.release_date).toDate(),
      }
      initialData.current = data;
      setData(data);
    }
  }, [props.movie]);

  const stopPropagation = (event) => {
    event.stopPropagation();
  }

  const validateMovie = (movie) => {
    const errors = {};

    if (!movie.title) {
      errors.title = FIELD_REQUIRED_ERROR;
    };

    if (!movie.release_date) {
      errors.release_date = FIELD_REQUIRED_ERROR;
    }

    if (!movie.poster_path) {
      errors.poster_path = FIELD_REQUIRED_ERROR;
    }

    if (!movie.genres.length) {
      errors.genres = FIELD_REQUIRED_ERROR;
    }

    if (!movie.overview) {
      errors.overview = FIELD_REQUIRED_ERROR;
    }

    if (!movie.runtime) {
      errors.runtime = FIELD_REQUIRED_ERROR;
    }

    return errors;
  }

  const onReset = () => {
    setData(initialData.current);
    setErrors({});
  }

  const onSelectGenre = (value) => {
    if (data.genres.includes(value)) {
      const updated = {
        ...data,
        genres: data.genres.filter(item => item !== value ),
      }
      setData(updated);
    } else {
      const updated = {
        ...data,
        genres: [...data.genres, value ],
      }
      setData(updated);
    }
  }

  const onRemoveGenre = (value, event) => {
    event.stopPropagation();
    onSelectGenre(value);
  }

  const onChange = (value, field) => {
    if (field === 'genres') {
      onSelectGenre(value);
    } else {
      const updated = {
        ...data,
        [field]: value,
      }
      setData(updated);
    }
  }

  const onSubmitClick = () => {
    const errors = validateMovie(data);

    if (Object.keys(errors).length) {
      return setErrors(errors);
    }

    onSubmit(data);
  }

  const renderSelectedGenres = () => {
    return (
      <div className={styles.genres}>
        {data.genres.map(item => (
          <div key={item} className={styles.genre} onClick={stopPropagation}>
            <span>{item}</span>
            <X className={styles.closeIcon} onClick={onRemoveGenre.bind(this, item)} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.movie ? 'Edit Movie': 'Add movie'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.form}>
          <div className={styles.label}>Title</div>
          <FormControl
            id="title"
            className={styles.input}
            placeholder="Movie title"
            value={data.title}
            onChange={(event) => onChange(event.target.value, event.target.id)}
          />
          {errors.title && <div className={styles.error}>{errors.title}</div>}

          <div className={styles.label}>Release date</div>
          <DatePicker
            date={data.release_date}
            placeholderText="Select Date"
            dateFormat={'yyyy-MM-dd'}
            onChange={(date) => onChange(date, 'release_date')}
          />
          {errors.release_date && <div className={styles.error}>{errors.release_date}</div>}

          <div className={styles.label}>Movie url</div>
          <FormControl
            id="poster_path"
            className={styles.input}
            placeholder="Movie URL here"
            value={data.poster_path}
            onChange={(event) => onChange(event.target.value, event.target.id)}
          />
          {errors.poster_path && <div className={styles.error}>{errors.poster_path}</div>}

          <div className={styles.label}>Genre</div>
          <Dropdown className={styles.dropdown}>
            <Dropdown.Toggle className={styles.dropdownTitle}>
              {data.genres.length ? renderSelectedGenres() : 'Select Genre'}
            </Dropdown.Toggle>

            <Dropdown.Menu alignRight className={styles.dropdownMenu}>
              {
                GENRES.filter(item => item.key !== 'all').map(item => {
                  const isSelected = data.genres.includes(item.value);
                  return (
                    <Dropdown.Item key={item.key} className={styles.dropdownItem} onClick={onChange.bind(null, item.value, 'genres')}>
                      <div className={cn(styles.check, {[styles.selected]: isSelected})}>
                        {isSelected && <Check /> }
                      </div>
                      
                      {item.value}
                    </Dropdown.Item>
                  );
                })
              }
            </Dropdown.Menu>
          </Dropdown>
          {errors.genres && <div className={styles.error}>{errors.genres}</div>}

          <div className={styles.label}>Overview</div>
          <FormControl
            id="overview"
            className={styles.input}
            placeholder="Overview here"
            value={data.overview}
            onChange={(event) => onChange(event.target.value, event.target.id)}
          />
          {errors.overview && <div className={styles.error}>{errors.overview}</div>}

          <div className={styles.label}>Runtime</div>
          <FormControl
            id="runtime"
            className={styles.input}
            placeholder="Runtime here"
            value={data.runtime}
            onChange={(event) => onChange(event.target.value, event.target.id)}
          />
          {errors.runtime && <div className={styles.error}>{errors.runtime}</div>}
        </div>

        <div className={styles.actions}>
          <Button size="lg" variant="tertiary" className={styles.cancelButton} onClick={onReset}>Reset</Button>
          <Button size="lg" variant="primary" onClick={onSubmitClick}>Submit</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

AddMovieModal.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    overview: PropTypes.string,
    runtime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

AddMovieModal.defaultProps = {
  movie: undefined,
};

export default AddMovieModal;
