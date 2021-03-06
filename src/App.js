import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import store from 'resources/store';

import HomePage from 'pages/home';
import ErrorBoundary from 'components/error-boundary';

import styles from './App.module.scss';

function App() {
  return (
    <>
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/:movieId?" component={HomePage} />
          </Switch>
        </Router>
      </Provider>
    </ErrorBoundary>
    <div className={styles.footer}>
      <div className={styles.logo}>
        <strong>netflix</strong>
        <span>roulette</span>
      </div>
    </div>
    </>
  );
}

export default App;
