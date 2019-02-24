import React, { Fragment } from 'react';
import Header from './presentational/Header';
import Footer from './presentational/Footer';
import Books from './container/Books';

const App = () => {
  return (
    <Fragment>
      <Header />
      <Books />
      <Footer />
    </Fragment>
  );
};

export default App;
