import { render, screen } from '@testing-library/react';
import { ModalDialog } from '../components/modal_dialog';
import userEvent from '@testing-library/user-event';

describe('Modal Dialog Component', () => {
  it('should render the modal dialog', () => {
    // Rendering the component
    render(<ModalDialog />);

    // Asserting if the heading is in the document
    const heading = screen.getByText('Modal Dialog');
    expect(heading).toBeInTheDocument();
  });

  it('should open the modal when the button is clicked', async () => {
    // Rendering the component
    render(<ModalDialog />);

    // Getting the button element
    const button = screen.getByText('Open Modal');

    // Simulating user click
    const user = userEvent.setup();
    await user.click(button);

    // Asserting if the modal is in the document
    const modalText = screen.getByText('This is a modal dialog');
    expect(modalText).toBeInTheDocument();
  });

  it('should close the modal when the close button is clicked', async () => {
    // Rendering the component
    render(<ModalDialog />);

    // Getting the button element
    const button = screen.getByText('Open Modal');

    // Simulating user click
    const user = userEvent.setup();
    await user.click(button);

    // Asserting if the modal is in the document
    const modalText = screen.getByText('This is a modal dialog');
    expect(modalText).toBeInTheDocument();

    // Getting the close button element
    const closeButton = screen.getByText('Close Modal');

    // Simulating user click
    await user.click(closeButton);

    // Asserting if the modal is not present
    expect(modalText).not.toBeInTheDocument();
  });
});
