import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import Dropdown from "react-bootstrap/Dropdown";

import styles from "./filters.module.scss";

function Filters(props) {
  const {
    filterOptions,
    sortOptions,
    filter,
    sortBy,
    onSelectFilter,
    onSelectSort,
  } = props;

  return (
    <div className={styles.filter}>
      <div className={styles.genres}>
        {filterOptions.map((item) => (
          <div
            key={item.key}
            //underline
            className={cn(styles.genre, {
              // dynamic property applyes if [styles.active]: filter.key === item.key, 
              [styles.active]: filter.key === item.key,
            })}
            onClick={onSelectFilter.bind(null, item)}
          >
            {item.value}
          </div>
        ))}
      </div>

      {sortOptions.length > 0 && (
        <div className={styles.sort}>
          <div>Sort by</div>
          <Dropdown className={styles.dropdown}>
            <Dropdown.Toggle className={styles.dropdownToggle}>
              {sortBy ? sortBy.value : "Select"}
            </Dropdown.Toggle>

            <Dropdown.Menu alignRight>
              {sortOptions.map((item) => (
                <Dropdown.Item
                  onClick={onSelectSort.bind(null, item)}
                  key={item.key}
                >
                  {item.value}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </div>
  );
}

Filters.propTypes = {
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  sortOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  filter: PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  }),
  sortBy: PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  }),
  onSelectFilter: PropTypes.func.isRequired,
  onSelectSort: PropTypes.func.isRequired,
};

// if no delivered properries
Filters.defaultProps = {
  filterOptions: [],
  sortOptions: [],
  filter: null,
  sortBy: null,
};

export default Filters;
