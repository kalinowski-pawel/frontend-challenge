import React from "react";
import { render, screen } from '@testing-library/react';
import { Home } from './Home';

test('renders site header', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Used API/i);
  expect(linkElement).toBeInTheDocument();
});
