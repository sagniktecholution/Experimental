import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { DataFetcher } from '../components/data_fetcher';

// Mock axios to control API responses
vi.mock('axios');

describe('DataFetcher', () => {
  // Reset axios mock before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display loading state while fetching data', () => {
    // Mock axios.get to return a pending promise
    (axios.get as jest.Mock).mockReturnValue(new Promise(() => {}));

    render(<DataFetcher />);

    // Assert loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display fetched data when successful', async () => {
    const mockData = { message: 'Hello from API' };
    // Mock axios.get to resolve with mock data
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    render(<DataFetcher />);

    // Wait for the data to be fetched and rendered
    await waitFor(() => {
      const dataElement = screen.getByText((content, element) => {
        return (
          element!.tagName.toLowerCase() === 'pre' &&
          content.includes('Hello from API')
        );
      });
      // Assert data is displayed
      expect(dataElement).toBeInTheDocument();
    });
  });

  it('should display error message when API request fails', async () => {
    const errorMessage = 'Something went wrong!';
    // Mock axios.get to reject with an error
    (axios.get as jest.Mock).mockRejectedValue({
      message: errorMessage,
    });

    render(<DataFetcher />);

    // Wait for the error message to be rendered
    const errorElement = await screen.findByText(`Error: ${errorMessage}`);

    // Assert error message is displayed
    expect(errorElement).toBeInTheDocument();
  });
});
