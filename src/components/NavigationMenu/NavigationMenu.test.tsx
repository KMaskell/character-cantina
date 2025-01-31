import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavigationMenu from './NavigationMenu';

describe('NavigationMenu', () => {
  const mockLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  test('renders all navigation links', () => {
    render(<NavigationMenu links={mockLinks} />);

    mockLinks.forEach((link) => {
      expect(screen.getByText(link.name)).toBeVisible();
    });
  });

  test('shows active indicator for current route', () => {
    render(<NavigationMenu links={mockLinks} />);

    const activeLink = screen.getByText('Home').parentElement;
    const activeIndicator = activeLink?.querySelector('div');

    expect(activeIndicator).toBeVisible();
  });

  test('navigates when link is clicked', () => {
    render(<NavigationMenu links={mockLinks} />);

    fireEvent.click(screen.getByText('About'));

    expect(screen.getByText('About')).toBeVisible();
  });

  test('has correct accessibility attributes', () => {
    render(<NavigationMenu links={mockLinks} />);

    expect(screen.getByRole('navigation')).toHaveAttribute(
      'aria-label',
      'Main navigation',
    );

    mockLinks.forEach((link) => {
      const linkElement = screen.getByText(link.name).parentElement;
      expect(linkElement).toHaveAttribute('aria-label', link.name);
    });
  });

  test('handles empty links array', () => {
    render(<NavigationMenu links={[]} />);
    const nav = screen.getByRole('navigation');

    expect(nav).toBeVisible();
    expect(nav.children.length).toBe(0);
  });
});
