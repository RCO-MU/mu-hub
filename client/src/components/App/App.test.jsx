import * as React from 'react';
import {
  test, expect, render, screen,
} from '@testing-library/react';
import App from './App';

// TODO: WRITE CORRECT TESTS
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
