import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Toast from './Toast';
import { useToast } from '@chakra-ui/react';

jest.mock('@chakra-ui/react', () => ({
  useToast: jest.fn(),
}));

describe('Toast', () => {
  const statuses = ['error', 'warning', 'success', 'info'] as const;

  test.each(statuses)(
    'triggers useToast with correct props for status: %s',
    async (status) => {
      const mockToast = jest.fn();
      (useToast as jest.Mock).mockReturnValue(mockToast);

      render(
        <Toast
          status={status}
          title={`${status} title`}
          description={`${status} description`}
        />,
      );

      await waitFor(() => {
        expect(mockToast).toHaveBeenCalledWith({
          title: `${status} title`,
          description: `${status} description`,
          status,
          duration: 6000,
          isClosable: true,
          position: 'top',
        });
      });
    },
  );

  test('triggers useToast once per unique message and ignores duplicate re-renders', async () => {
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue(mockToast);

    const { rerender } = render(
      <Toast status="error" title="Error" description="An error occurred" />,
    );

    rerender(
      <Toast status="error" title="Error" description="An error occurred" />,
    );

    rerender(
      <Toast
        status="error"
        title="Error"
        description="A different error occurred"
      />,
    );

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledTimes(2);
    });

    expect(mockToast).toHaveBeenNthCalledWith(1, {
      title: 'Error',
      description: 'An error occurred',
      status: 'error',
      duration: 6000,
      isClosable: true,
      position: 'top',
    });

    expect(mockToast).toHaveBeenNthCalledWith(2, {
      title: 'Error',
      description: 'A different error occurred',
      status: 'error',
      duration: 6000,
      isClosable: true,
      position: 'top',
    });
  });

  test('does not trigger useToast on re-renders with identical props', async () => {
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue(mockToast);

    const { rerender } = render(
      <Toast status="error" title="Error" description="Error description" />,
    );

    rerender(
      <Toast status="error" title="Error" description="Error description" />,
    );

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledTimes(1);
    });
  });
});
