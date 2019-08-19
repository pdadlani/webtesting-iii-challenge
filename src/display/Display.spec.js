// Test away!

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import 'jest-dom/extend-expect';


import Display from './Display.js';

afterEach(cleanup);

describe('<Display />', () => {
  // snapshot of component
  it('matches snapshot', () => {
    // generates a DOM tree
    const tree = renderer.create(<Display />);
    // snapshots are a JSON representation of a DOM tree
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('closed prop tests', () => {
  it("displays 'Closed' if the 'closed' prop is true", () => {
    const { getByText } = render(<Display closed={true} />);
    getByText(/closed/i);
  });
  it("displays 'Open' if the 'closed' prop is false", () => {
    const { getByText } = render(<Display closed={false} />);
    getByText(/open/i);
  });
});

describe('locked prop tests', () => {
  it("displays 'Locked' if the 'locked' prop is true", () => {
    const { getByText } = render(<Display locked={true} />);
    getByText(/locked/i);
  });
  it("displays 'Unlocked' if the 'locked' prop is false", () => {
    const { getByText } = render(<Display locked={false} />);
    getByText(/unlocked/i);
  });
});

describe('red-led class tests', () => {
  it('uses red-led class when locked', () => {
    const { getByText } = render(<Display locked={true} />);
    expect(getByText(/locked/i)).toHaveClass('red-led');
  });
  it('uses red-led class when closed', () => {
    const { getByText } = render(<Display closed={true} />);
    expect(getByText(/closed/i)).toHaveClass('red-led');
  });
});

describe('green-led class tests', () => {
  it('uses green-led class when unlocked', () => {
    const { getByText } = render(<Display locked={false} />);
    expect(getByText(/unlocked/i)).toHaveClass('green-led');
  });
  it('uses green-led class when open', () => {
    const { getByText } = render(<Display closed={false} />);
    expect(getByText(/open/i)).toHaveClass('green-led');
  })
})