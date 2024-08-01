import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToggleTheme } from '../components/toggle_theme';

describe('ToggleTheme Component', () => {
  it('should render with initial theme (light mode)', () => {
    // Rendering the component
    render(<ToggleTheme />);

    // Asserting the initial theme - light mode
    const container = screen.getByText('Toggle Theme').closest('div');
    expect(container).toHaveStyle({ background: '#fff', color: '#000' });
    expect(screen.getByRole('button')).toHaveTextContent('Switch to Dark Mode');
  });

  it('should toggle to dark mode on button click', async () => {
    render(<ToggleTheme />);
    const buttonElement = screen.getByRole('button');

    // Simulating user clicking the button to toggle to dark mode
    await userEvent.click(buttonElement);

    // Assertions for dark mode
    const container = screen.getByText('Toggle Theme').closest('div');
    expect(container).toHaveStyle({ background: '#333', color: '#fff' });
    expect(buttonElement).toHaveTextContent('Switch to Light Mode');
  });

  it('should toggle back to light mode from dark mode', async () => {
    render(<ToggleTheme />);
    const buttonElement = screen.getByRole('button');

    // Switching to dark mode
    await userEvent.click(buttonElement);

    // Switching back to light mode
    await userEvent.click(buttonElement);

    // Assertions for light mode
    const container = screen.getByText('Toggle Theme').closest('div');
    expect(container).toHaveStyle({ background: '#fff', color: '#000' });
    expect(buttonElement).toHaveTextContent('Switch to Dark Mode');
  });
});
