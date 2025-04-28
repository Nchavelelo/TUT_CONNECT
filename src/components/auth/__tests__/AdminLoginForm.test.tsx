
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminLoginForm from '../AdminLoginForm';

describe('AdminLoginForm', () => {
  const mockOnSubmit = vi.fn();
  
  it('renders admin login form correctly', () => {
    render(<AdminLoginForm onSubmit={mockOnSubmit} isLoading={false} />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('submits form with correct data', async () => {
    render(<AdminLoginForm onSubmit={mockOnSubmit} isLoading={false} />);
    
    await userEvent.type(screen.getByLabelText(/email/i), 'admin@tut.ac.za');
    await userEvent.type(screen.getByLabelText(/password/i), 'testpassword');
    
    fireEvent.submit(screen.getByRole('form'));
    
    expect(mockOnSubmit).toHaveBeenCalledWith('admin@tut.ac.za', 'testpassword');
  });

  it('disables submit button when loading', () => {
    render(<AdminLoginForm onSubmit={mockOnSubmit} isLoading={true} />);
    
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText('Signing in...')).toBeInTheDocument();
  });
});
