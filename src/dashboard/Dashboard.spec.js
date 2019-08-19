// Test away

import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import Dashboard from './Dashboard.js';

describe('<Dashboard />', () => {
  // snapshot of component
  it('matches snapshot', () => {
    // generates a DOM tree
    const tree = renderer.create(<Dashboard />);
    // snapshots are a JSON representation of a DOM tree
    expect(tree.toJSON()).toMatchSnapshot();
  });

  // renders controls and displays 
  it('renders controls and displays', () => {
    const { getByText } = render(<Dashboard />);
    getByText(/unlocked/i)
    getByText(/open/i)
    getByText(/lock gate/i)
    getByText(/close gate/i)
  })
});
