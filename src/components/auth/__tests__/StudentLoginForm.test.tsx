
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StudentLoginForm from '../StudentLoginForm';

describe('StudentLoginForm', () => {
  const mockOnSubmit = vi.fn();
  
  it('renders student login form correctly', () => {
    render(<StudentLoginForm onSubmit={mockOnSubmit} isLoading={false} />);
    
    expect(screen.getByLabelText(/student number or email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('handles student number input correctly', async () => {
    render(<StudentLoginForm onSubmit={mockOnSubmit} isLoading={false} />);
    
    const input = screen.getByLabelText(/student number or email/i);
    await userEvent.type(input, '231967941');
    
    expect(screen.getByText('231967941@tut4life.ac.za')).toBeInTheDocument();
  });

  it('handles email input correctly', async () => {
    render(<StudentLoginForm onSubmit={mockOnSubmit} isLoading={false} />);
    
    const input = screen.getByLabelText(/student number or email/i);
    await userEvent.type(input, '231967941@tut4life.ac.za');
    
    expect(screen.getByDisplayValue('231967941')).toBeInTheDocument();
  });

  it('submits form with correct data', async () => {
    render(<StudentLoginForm onSubmit={mockOnSubmit} isLoading={false} />);
    
    await userEvent.type(screen.getByLabelText(/student number or email/i), '231967941');
    await userEvent.type(screen.getByLabelText(/password/i), 'testpassword');
    
    fireEvent.submit(screen.getByRole('form'));
    
    expect(mockOnSubmit).toHaveBeenCalledWith('231967941', 'testpassword');
  });

  it('disables submit button when loading', () => {
    render(<StudentLoginForm onSubmit={mockOnSubmit} isLoading={true} />);
    
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText('Signing in...')).toBeInTheDocument();
  });
});
