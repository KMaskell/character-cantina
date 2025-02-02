import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  test('renders component correctly', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId('loading-spinner');

    expect(spinner).toBeVisible();
  });

  test('renders message when passed', () => {
    const message = 'Loading data...';
    render(<LoadingSpinner message={message} />);

    expect(screen.getByText(message)).toBeVisible();
  });
});
