import React from 'react';
import { shallow } from '../../enzyme';
import App from '../components/App';

describe('Maktaba application', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toBeDefined();
  });
});
