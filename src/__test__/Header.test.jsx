import React from 'react';
import { shallow } from '../../enzyme';
import Header from '../components/Header';

describe('My Bookfinder application', () => {
  it('Header component renders without crashing', () => {
    shallow(<Header />);
  });

  it('renders the application title correctly', () => {
    const wrapper = shallow(<Header />);
    const headerTitle = wrapper.find('h4.text-center').children().first().text();
    expect(headerTitle).toEqual('Book Finder');
  });
});
