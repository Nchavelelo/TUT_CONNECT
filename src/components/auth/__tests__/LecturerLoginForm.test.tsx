
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LecturerLoginForm from '../LecturerLoginForm';

describe('LecturerLoginForm', () => {
  const mockOnSubmit = vi.fn();
  
  it('renders lecturer login form correctly', () => {
    render(<LecturerLoginForm onSubmit={mockOnSubmit} isLoading={false} />);
    
    expect(screen.getByLabelText(/staff number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows correct email format', async () => {
    render(<LecturerLoginForm onSubmit={mockOnSubmit} isLoading={false} />);
    
    await userEvent.type(screen.getByLabelText(/staff number/i), '12345678');
    
    expect(screen.getByText('12345678@tut.ac.za')).toBeInTheDocument();
  });

  it('submits form with correct data', async () => {
    render(<LecturerLoginForm onSubmit={mockOnSubmit} isLoading={false} />);
    
    await userEvent.type(screen.getByLabelText(/staff number/i), '12345678');
    await userEvent.type(screen.getByLabelText(/password/i), 'testpassword');
    
    fireEvent.submit(screen.getByRole('form'));
    
    expect(mockOnSubmit).toHaveBeenCalledWith('12345678', 'testpassword');
  });

  it('disables submit button when loading', () => {
    render(<LecturerLoginForm onSubmit={mockOnSubmit} isLoading={true} />);
    
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText('Signing in...')).toBeInTheDocument();
  });
});
