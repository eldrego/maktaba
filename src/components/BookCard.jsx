import React, { Component } from 'react';
import PropTypes from 'prop-types';
import randomize from 'randomatic';

class BookCard extends Component {
  renderAuthors(authors) {
    const authorList = authors.map((author) => {
      const authorKey = randomize('0', 6);
      return (<span key={authorKey}> { author},</span>);
    });

    return authorList;
  }

  render() {
    const defaultImage = 'https://summer.pes.edu/wp-content/uploads/2019/02/default-2.jpg';
    const { book } = this.props;
    let image = '';
    let authors = '';

    if (!book.volumeInfo.imageLinks) {
      image = defaultImage;
    } else {
      image = book.volumeInfo.imageLinks.thumbnail;
    }

    if (!book.volumeInfo.authors) {
      authors = <span>No authors found</span>;
    } else {
      authors = this.renderAuthors(book.volumeInfo.authors);
    }

    return (
      <div className="">
        <div className="card">
          <div className="card-image"><img className="card-img-top" src={image} alt="Book image" /></div>
          <div className="card-body">
            <h6 className="card-title mb-2 text-muted text-left">
              {book.volumeInfo.title}
            </h6>
            <p className="card-text book-author">
              <span><b>Authored By: </b></span>
              { authors }
            </p>
            <p className="card-text">
              <small className="text-muted book-publisher">
                <span><b>Published By: </b></span>
                {book.volumeInfo.publisher || 'No Publisher provided'}</small>
            </p>
            <a className="btn btn-sm btn-success" target="_blank" href={book.volumeInfo.previewLink}>See this Book</a>
          </div>
        </div>
      </div>
    );
  }
}

BookCard.propTypes = {
  book: PropTypes.object,
};

export default BookCard;
