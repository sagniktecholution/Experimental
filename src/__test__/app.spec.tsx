import { render, screen, fireEvent } from '@app/test-utils';
import { App } from '../app';

test('render App', () => {
  render(<App />);
  const element = screen.getByText('Vite + React');
  expect(element).toBeInTheDocument();
});

test('check count on button click', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: 'count is 0' });
  const countElement = screen.getByRole('button');

  expect(countElement.textContent).toBe('count is 0');

  fireEvent.click(button);
  expect(countElement.textContent).toBe('count is 1');

  fireEvent.click(button);
  expect(countElement.textContent).toBe('count is 1');
});
