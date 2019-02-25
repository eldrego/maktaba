import React, { Fragment } from 'react';
import Header from './presentational/Header';
import Books from './container/Books';

const App = () => {
  return (
    <Fragment>
      <Header />
      <Books />
    </Fragment>
  );
};

export default App;
