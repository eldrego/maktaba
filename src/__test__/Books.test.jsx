import React from 'react';
import { shallow, mount } from '../../enzyme';
import Books from '../components/Books';

jest.mock('../services/getBooks');

describe('My Bookfinder application', () => {
  describe('Book component', () => {
    it('renders without crashing', () => {
      shallow(<Books />);
    });

    it('renders the empty page message correctly', () => {
      const wrapper = shallow(<Books />);
      const contentTitle = wrapper.find('h5.empty-message').children().first().text();
      expect(contentTitle).toEqual('Nothing here yet - Try searching for a book!');
    });

    describe('Search, triggers', () => {
      const event = {
        preventDefault: () => {},
        target: {
          name: 'searchParam',
          value: 'This gangs of new york'
        },
      };

      it('state change with the search term before searching', () => {
        const wrapper = shallow(<Books />);
        wrapper.find('input.search-form').simulate('change', event);
        expect(wrapper.instance().state.searchParam).toBe('This gangs of new york');
      });

      it('displaying the loader when the search button is clicked', () => {
        const wrapper = shallow(<Books />);
        jest.spyOn(wrapper.instance(), 'onClick');
        expect(wrapper.instance().state.isLoading).toBe(true);
        expect(wrapper.find('Loading').length).toEqual(1);
      });

      it('the fetchBooks method when the search button is clicked', () => {
        const wrapper = mount(<Books />);
        const spy = jest.spyOn(wrapper.instance(), 'fetchBooks');
        wrapper.update();
        wrapper.find('input.search-form').simulate('change', event);
        wrapper.find('button.search').simulate('click', event);
        expect(spy).toHaveBeenCalled();
      });

      it('fetching the books using google Books API and renders them on mount', (done) => {
        const wrapper = shallow(<Books />);
        setTimeout(() => {
          wrapper.update();
          expect(wrapper.instance().state.books.length).toEqual(6);
          expect(wrapper.find('BookCard').length).toEqual(6);
          done();
        });
      });
    });
  });
});
