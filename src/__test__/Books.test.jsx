import React from 'react';
import { shallow } from '../../enzyme';
import Books from '../components/Books';
import mockAxios from '../__mocks__/axios';

jest.mock('../services/getBooks');

describe('My Bookfinder application', () => {
  describe('Book component', () => {
    it('Books component renders without crashing', () => {
      shallow(<Books />);
    });

    it('renders the empty page message correctly', () => {
      const wrapper = shallow(<Books />);
      const contentTitle = wrapper.find('h5.empty-message').children().first().text();
      expect(contentTitle).toEqual('Nothing here yet - Try searching for a book!');
    });

    describe('Search', () => {
      const event = {
        preventDefault: () => {},
        target: {
          name: 'searchParam',
          value: 'This gangs of new york'
        },
      };

      const wrapper = shallow(<Books />);

      it('captures the search term before searching', () => {
        wrapper.find('input.search-form').simulate('change', event);
        expect(wrapper.state().searchParam).toBe('This gangs of new york');
      });

      it('displays the loader when the search button is clicked', () => {
        jest.spyOn(event, 'preventDefault');
        wrapper.find('button.search').simulate('click', event);
        expect(event.preventDefault).toBeCalled();
        expect(wrapper.state().isLoading).toBe(true);
        // revist test when loader displays
        // expect(wrapper.find('div.loader-display').children()).toEqual({});
      });

      xit('returns the result for the searched book', async () => {
        setTimeout(() => {
          wrapper.update();
          expect(wrapper.find('BookCard').length).toEqual(1);
          done();
        });

        // const BooksClass = new Books();
        // mockAxios.get.mockImplementationOnce(() => Promise.resolve({
        //   data: {
        //     items: mockBooks
        //   },
        //   status: 200
        // }));

        // await BooksClass.fetchBooks('gangs');
        // wrapper.update();
        // expect(wrapper.state().books.length).toEqual(0);
      });
    });
  });
});
