import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

import backgroundImage from "img/movies.png";

import styles from "./hero-area.module.scss";

function HeroArea(props) {
  const [searchString, setSearchString] = useState("");

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <div className={styles.background}>
          <img
            className={styles.backgroundImage}
            src={backgroundImage}
            alt=""
          />
          <div className={styles.shadow} />
        </div>

        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <strong>netflix</strong>
              <span>roulette</span>
            </div>
            <Button size="lg" variant="light" className={styles.addButton}>
              + Add movie
            </Button>
          </div>

          <div className={styles.content}>
            <div className={styles.form}>
              <div className={styles.title}>Find your movie</div>
              <div className={styles.search}>
                {/* form field */}
                <FormControl
                  className={styles.input}
                  placeholder="What do you want to watch"
                  value={searchString}
                  // render with each new char
                  onChange={(event) => setSearchString(event.target.value)}
                />
                <Button
                  size="lg"
                  variant="primary"
                  className={styles.searchButton}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

HeroArea.propTypes = {
  movie: PropTypes.shape({}),
};

HeroArea.defaultProps = {
  movie: undefined,
};

export default HeroArea;
