import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';

import styles from './error-boundary.module.scss';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  onClick = () => {
    window.location.replace("/");
  }

  render () {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.logo}>
            <strong>netflix</strong>
            <span>roulette</span>
          </div>

          <div className={styles.content}>
            <div className={styles.title}>
              Page Not Found
            </div>
            <div className={styles.error}>
              404
            </div>

            <Button variant="link" size="lg" className={styles.button} onClick={this.onClick}>Go back to home</Button>
          </div>
        </div>
      )
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ErrorBoundary;