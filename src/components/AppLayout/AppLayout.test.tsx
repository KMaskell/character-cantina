import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import AppLayout from '../AppLayout';

describe('AppLayout', () => {
  test('renders navigation correctly', () => {
    const MockNavigation = () => <div data-testid="mock-nav">Navigation</div>;

    render(
      <MemoryRouter>
        <AppLayout navigation={<MockNavigation />} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('mock-nav')).toBeInTheDocument();
  });

  test('renders Outlet content correctly', () => {
    const MockNavigation = () => <div data-testid="mock-nav">Navigation</div>;
    const MockContent = () => (
      <div data-testid="mock-content">Page Content</div>
    );

    render(
      <MemoryRouter>
        <AppLayout navigation={<MockNavigation />} />
        <MockContent />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('mock-content')).toBeInTheDocument();
  });
});
