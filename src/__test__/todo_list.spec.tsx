import { render, screen, fireEvent } from '@testing-library/react';
import { TodoList } from '../components/todo_list';

describe('TodoList', () => {
  it('should render the heading and input field', () => {
    render(<TodoList />);
    expect(
      screen.getByRole('heading', { name: /Todo List/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should add a new todo item', () => {
    render(<TodoList />);
    const inputElement = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /Add Todo/i });

    fireEvent.change(inputElement, { target: { value: 'Learn React' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Learn React')).toBeInTheDocument();
  });

  it('should display multiple todo items', () => {
    render(<TodoList />);
    const inputElement = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /Add Todo/i });

    fireEvent.change(inputElement, { target: { value: 'Learn React' } });
    fireEvent.click(addButton);

    fireEvent.change(inputElement, {
      target: { value: 'Build a project' },
    });
    fireEvent.click(addButton);

    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a project')).toBeInTheDocument();
  });

  it('should clear the input field after adding a todo', () => {
    render(<TodoList />);
    const inputElement = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /Add Todo/i });

    fireEvent.change(inputElement, { target: { value: 'Learn React' } });
    fireEvent.click(addButton);

    expect((inputElement as HTMLInputElement).value).toBe('');
  });
});
