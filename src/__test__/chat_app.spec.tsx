import { render, screen, fireEvent } from '@testing-library/react';
import { ChatApp } from '../components/chat_app';

describe('ChatApp', () => {
  it('should render chat application title', () => {
    // Rendering the component
    render(<ChatApp />);
    // Asserting if the title is in the document
    expect(screen.getByText('Chat Application')).toBeInTheDocument();
  });

  it('should be able to send and display messages', async () => {
    render(<ChatApp />);

    // Finding the input element using its role and placeholder
    const inputElement = screen.getByRole('textbox');
    // Finding the button element using its role
    const sendButton = screen.getByRole('button', { name: /send/i });

    // Typing message into the input field
    fireEvent.change(inputElement, { target: { value: 'Hello, world!' } });
    // Clicking the send button
    fireEvent.click(sendButton);

    // Asserting if the sent message is displayed in the chat box
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  });
});
