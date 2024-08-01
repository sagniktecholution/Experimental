import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from '../components/counter';

describe('Counter', () => {
  it('should render initial count', () => {
    // Rendering the component
    render(<Counter />);
    // Asserting if the count is 0
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should increment count on button click', async () => {
    render(<Counter />);
    // Simulating user click
    const user = userEvent.setup();
    await user.click(screen.getByText('Increment'));
    // Assertions after click event
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should decrement count on button click', async () => {
    render(<Counter />);
    const user = userEvent.setup();
    await user.click(screen.getByText('Decrement'));
    expect(screen.getByText('-1')).toBeInTheDocument();
  });
});
