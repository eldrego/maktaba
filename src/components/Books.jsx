import React, { Component, Fragment } from 'react';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import Loader from 'react-loading';
import randomize from 'randomatic';
import BookCard from './BookCard';
import getBooks from '../services/getBooks';


class Books extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchParam: '',
      books: [],
      isLoading: false,
    };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.fetchBooks('Gangs');
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onClick(event) {
    event.preventDefault();
    this.setState({
      isLoading: !this.state.isLoading,
      books: []
    });
    const { searchParam } = this.state;
    if (!searchParam) {
      ToastsStore.error('Please enter a seach parameter');
    } else {
      this.fetchBooks(searchParam);
    }
  }

  async fetchBooks(parameter) {
    this.setState({ isLoading: !this.state.isLoading });

    try {
      const books = await getBooks(parameter);
      if (books.status === 200) {
        if (books.data.items.length > 0) {
          this.setState({ books: books.data.items });
          this.setState({ isLoading: !this.state.isLoading });
        } else {
          ToastsStore.warning('No books were returned');
        }
      }
    } catch (error) {
      ToastsStore.error(error);
    }
  }

  renderBooks(books) {
    const bookItems = books.map((book) => {
      const bookKey = randomize('0', 6);
      return (
        <div key={bookKey} className="col-md-4 book-card">
          <BookCard book={book} />
        </div>
      );
    });

    return bookItems;
  }

  render() {
    const { books, isLoading } = this.state;

    const loading = isLoading
      ? <Loader className={'loader'} type={'balls'} color={'#59D975'} height={'4%'} width={'4%'}/>
      : false;

    const bookListing = books.length < 1 ? <div className="col-md-12"><h5 className="empty-message text-center">Nothing here yet - Try searching for a book!</h5></div> : this.renderBooks(books);

    return (
      <Fragment>
        <div className="bookSearch container">
          <div className="row">
            <div className="col-md-12">
              <form className="mx-sm-3 mb-4 pb-4">
                <div className="form-row">
                  <div className="offset-md-1 col-9">
                    <input type="text"
                      className="form-control search-form"
                      name="searchParam"
                      autoComplete="off"
                      placeholder="Search by book title or author"
                      value={this.state.title}
                      onChange={this.onChange} />
                  </div>
                  <div className="col">
                    <button
                      type="button"
                      className="btn btn-primary mb-2 btn-success search"
                      onClick={this.onClick}>Search</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="text-center loader-display">
                { loading }
              </div>
            </div>
          </div>
          <div className="row bookListing">
            { bookListing }
          </div>
        </div>
        <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_LEFT}/>
      </Fragment>
    );
  }
}

export default Books;
