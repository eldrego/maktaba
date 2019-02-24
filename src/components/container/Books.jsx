import React, { Component, Fragment } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
import randomize from 'randomatic';
import BookCard from '../presentational/BookCard';


class Books extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchParam: '',
      books: []
    };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onClick() {
    const { searchParam } = this.state;
    if (!searchParam) {
      // do notthing
      console.log('Inculde a prompt here');
    } else {
      this.fetchBooks(searchParam);
    }
  }

  fetchBooks(parameter) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${parameter}`;
    axios.get(url)
      .then((response) => {
        this.setState({ books: response.data.items });
        console.log(this.state.books);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderBooks(books) {
    const bookItems = books.map((book) => {
      const bookKey = randomize('0', 6);
      return (
        <div key={bookKey} className="col-md-3">
          <BookCard book={book} />
        </div>
      );
    });

    return bookItems;
  }

  render() {
    const { books } = this.state;

    const bookListing = books.length < 1 ? <h5>No books listed</h5> : this.renderBooks(books);

    return (
      <Fragment>
        <div className="bookSearch container">
          <div className="row">
            <div className="col-md-12">
              <form className="form-inline">
                <div className="form-group mx-sm-3 mb-2">
                  <label htmlFor="book" className="sr-only">Book detail</label>
                  <input type="text"
                    className="form-control"
                    name="searchParam"
                    autoComplete="off"
                    placeholder="Book Finder"
                    value={this.state.title}
                    onChange={this.onChange} />
                </div>
                <button
                  type="button"
                  className="btn btn-primary mb-2"
                  onClick={this.onClick}>Search</button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              { bookListing }
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

Books.propTypes = {

};

export default Books;
