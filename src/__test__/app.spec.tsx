import { render, screen } from '@app/test-utils';
import { App } from '../app';

test('render App', () => {
  render(<App />);
  const element = screen.getByText('Vite + React');
  expect(element).toBeInTheDocument();
});
