import React from 'react';
import { shallow } from '../../enzyme';
import BookCard from '../components/BookCard';
import book from '../__mocks__/book.json';
import bookWithErrors from '../__mocks__/bookWithErrors.json';

describe('My Bookfinder application', () => {
  describe('BookCard component', () => {
    it('Books component renders without crashing', () => {
      shallow(<BookCard book={book}/>);
    });

    it('renders the book title correctly', () => {
      const wrapper = shallow(<BookCard book={book} />);
      const bookTitle = wrapper.find('h6.card-title').children().first().text();
      expect(bookTitle).toEqual('A World of Gangs');
      expect(wrapper.find('img.card-img-top').prop('src')).toEqual(book.volumeInfo.imageLinks.thumbnail);
    });

    it('renders a no-authors message when book has no author', () => {
      const wrapper = shallow(<BookCard book={bookWithErrors} />);
      const bookAuthor = wrapper.find('p.book-author').children().last().text();
      expect(bookAuthor).toEqual('No authors found');
    });

    it('renders a no-publisher message when book has no publisher', () => {
      const wrapper = shallow(<BookCard book={bookWithErrors} />);
      const bookPublisher = wrapper.find('small.book-publisher').children().last().text();
      expect(bookPublisher).toEqual('No Publisher provided');
    });

    it('renders a default image when book has no thumbnail', () => {
      const wrapper = shallow(<BookCard book={bookWithErrors} />);
      const bookImage = wrapper.find('img.card-img-top').prop('src');
      expect(bookImage).toEqual('https://summer.pes.edu/wp-content/uploads/2019/02/default-2.jpg');
    });
  });
});
