import { render, screen } from '@testing-library/react';
import { UserProfile } from '../components/user_profile';
import axios from 'axios';
import { vi } from 'vitest';

// Mock axios to control API responses
vi.mock('axios');

describe('UserProfile', () => {
  const userId = '123';

  it('should display loading state while fetching user data', () => {
    // Mocking axios.get to not resolve immediately
    vi.mocked(axios.get).mockImplementation(() => new Promise(() => {}));

    render(<UserProfile userId={userId} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display error message when API request fails', async () => {
    const errorMessage = 'Failed to fetch user data';
    vi.mocked(axios.get).mockRejectedValue({
      message: errorMessage,
    });

    render(<UserProfile userId={userId} />);

    // Wait for the error message to be displayed
    expect(
      await screen.findByText(`Error: ${errorMessage}`),
    ).toBeInTheDocument();
  });
});
