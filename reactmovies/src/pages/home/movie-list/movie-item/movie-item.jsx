import React, { useState } from "react";
import PropTypes from "prop-types";

import Dropdown from "react-bootstrap/Dropdown";
import { ThreeDotsVertical } from "react-bootstrap-icons";

import styles from "./movie-item.module.scss";

function MovieItem(props) {
  const { movie } = props;
  //false - default; true - renderErrorComponent
  const [showErrorComponent, setShowErrorComponent] = useState(false);

  const throwExampleError = () => {
    setShowErrorComponent(true);
  };

  const renderErrorComponent = () => {
    throw Error("error");
    return <div />;
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.poster}
        src={movie.poster_path}
        alt={movie.title}
      />
      <div className={styles.description}>
        <div className={styles.title}>{movie.title}</div>
        <div className={styles.releaseDate}>
          {movie.release_date.split("-")[0]}
        </div>
      </div>
      <div className={styles.genres}>
        {/* , after first genre*/}
        {movie.genres.map((item, index) => (
          <div key={item}>
            {index !== 0 && <span>, </span>}
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className={styles.dropdown}>
        <Dropdown>
          <Dropdown.Toggle  className={styles.dropdownTitle}>
            <div className={styles.icon}>
              <ThreeDotsVertical />
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu  className={styles.dropdownMenu}>
            <Dropdown.Item className={styles.dropdownItem}>Edit</Dropdown.Item>
            <Dropdown.Item className={styles.dropdownItem}>
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
      {/* if  showErrorComponent => render renderErrorComponent*/}
      {showErrorComponent && renderErrorComponent()}
    </div>
  );
}

MovieItem.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default MovieItem;
