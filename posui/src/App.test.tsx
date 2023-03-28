import React from 'react';
import { render, screen } from '@testing-library/react';
import Products from './pages/products';

test('renders learn react link', () => {
  render(<Products/>);
  const linkElement = screen.getByText(/hello world/i);
  expect(linkElement).toBeInTheDocument();
});
