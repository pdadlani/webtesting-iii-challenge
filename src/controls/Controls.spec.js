// Test away!

import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import 'jest-dom/extend-expect';
import { toBeDisabled } from 'jest-dom';

import Controls from './Controls.js';
import Dashboard from '../dashboard/Dashboard.js';

afterEach(cleanup);

describe('<Controls />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Controls />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('buttons to toggle closed / locked state', () => {
  it('displays two buttons: Lock Gate & Close Gate', () => {
    const { getByText } = render(<Controls />);
    getByText(/lock gate/i);
    getByText(/close gate/i);
  });
});

describe('buttons text changes to reflect state', () => {
  it('displays Open when Closed Gate button clicked', () => {
    const { getByText } = render(<Dashboard />);
    const lockGateButton = getByText(/lock gate/i);
    const closeGateButton = getByText(/close gate/i);
    // click on close gate
    fireEvent.click(closeGateButton);
    // cannot use regexp in following line
    expect(closeGateButton.textContent).toBe('Open Gate')
    fireEvent.click(lockGateButton);
    expect(lockGateButton.textContent).toBe('Unlock Gate');
  });
});

describe('disables buttons based upon state', () => {
  it('disables close button if gate is locked', () => {
    const { getByText } = render(<Controls locked={true} />);
    expect(getByText(/close gate/i)).toBeDisabled();
  });
  it('disables lock button if gate is open', () => {
    const { getByText } = render(<Controls closed={false} />);
    expect(getByText(/lock gate/i)).toBeDisabled();
  });
});