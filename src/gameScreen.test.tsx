import React from 'react';
import { render, screen } from '@testing-library/react';
import GameScreen from './screens/gameScreen/gameScreen';

test('renders learn react link', () => {
  render(<GameScreen />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
