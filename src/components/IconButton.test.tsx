import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IconButton from './IconButton';

describe('IconButton', () => {
  it('renders the button with icon and aria-label', () => {
    render(<IconButton icon="⭐" ariaLabel="Star button" />);
    const button = screen.getByRole('button', { name: /star button/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByText('⭐')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<IconButton icon="⭐" ariaLabel="Star button" onClick={handleClick} />);
    const button = screen.getByRole('button', { name: /star button/i });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state and disables the button', () => {
    render(<IconButton icon="⭐" ariaLabel="Star button" loading />);
    const button = screen.getByRole('button', { name: /star button/i });
    expect(button).toBeDisabled();
    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<IconButton icon="⭐" ariaLabel="Star button" disabled />);
    const button = screen.getByRole('button', { name: /star button/i });
    expect(button).toBeDisabled();
  });
});
