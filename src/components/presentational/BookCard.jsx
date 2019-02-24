import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

class BookCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      read: false,
    };
  }

  render() {
    const { book } = this.props;
    const image = book.volumeInfo.imageLinks.thumbnail ? book.volumeInfo.imageLinks.thumbnail : 'https://summer.pes.edu/wp-content/uploads/2019/02/default-2.jpg'

    return (
      <div className="card">
        <img className="card-img-top" src={image} alt="Note image"/>
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted text-center">
            {book.volumeInfo.title}
          </h6>
          <p className="card-subtitle mb-2 text-muted text-center">
            {book.volumeInfo.description}
          </p>
        </div>
      </div>
    );
  }
}

BookCard.propTypes = {
  book: PropTypes.object,
};

export default BookCard;
