
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DemoLoginButtons from '../DemoLoginButtons';
import { UserRole } from '@/data/mockData';

describe('DemoLoginButtons', () => {
  const mockOnDemoLogin = vi.fn();
  
  it('renders all demo login buttons', () => {
    render(<DemoLoginButtons onDemoLogin={mockOnDemoLogin} isLoading={false} />);
    
    expect(screen.getByRole('button', { name: /student/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /lecturer/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /admin/i })).toBeInTheDocument();
  });

  it.each([
    ['Student', 'student'],
    ['Lecturer', 'lecturer'],
    ['Admin', 'admin'],
  ])('calls onDemoLogin with correct role when %s button is clicked', async (buttonText, role) => {
    render(<DemoLoginButtons onDemoLogin={mockOnDemoLogin} isLoading={false} />);
    
    const button = screen.getByRole('button', { name: new RegExp(buttonText, 'i') });
    await userEvent.click(button);
    
    expect(mockOnDemoLogin).toHaveBeenCalledWith(role as UserRole);
  });

  it('disables all buttons when loading', () => {
    render(<DemoLoginButtons onDemoLogin={mockOnDemoLogin} isLoading={true} />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });
});
