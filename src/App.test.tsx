import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the main heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', {
    level: 1,
    name: /Star Wars Character Cantina/i,
  });
  expect(heading).toBeInTheDocument();
});
