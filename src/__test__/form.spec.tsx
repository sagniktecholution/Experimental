import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Form } from '../components/form';

describe('Form', () => {
  // it('should display error message when email is invalid', async () => {
  //   // Arrange
  //   render(<Form />);
  //   const emailInput = screen.getByRole('textbox');
  //   const submitButton = screen.getByRole('button', { name: /submit/i });

  //   // Act
  //   await userEvent.type(emailInput, 'invalid-email');
  //   await userEvent.click(submitButton);

  //   // Assert
  //   const errorMessage = screen.getByText('Invalid email');
  //   expect(errorMessage).toBeVisible();
  // });

  it('should not display error message when email is valid', async () => {
    // Arrange
    render(<Form />);
    const emailInput = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Act
    await userEvent.type(emailInput, 'valid@email.com');
    await userEvent.click(submitButton);

    // Assert
    const errorMessage = screen.queryByText('Invalid email');
    expect(errorMessage).not.toBeInTheDocument();
  });

  // Add more test cases to cover other aspects of the form's functionality
});
