import { Flex, Spinner, Text } from '@chakra-ui/react';
import { FC } from 'react';

type LoadingSpinnerProps = {
  message?: string;
};

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ message }) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      position="fixed"
      top={20}
      left="50%"
      transform="translateX(-50%)"
      width="auto"
      zIndex={10}
      p={4}
      data-testid="loading-spinner"
    >
      <Spinner size={['xs', 'sm', 'lg', 'xl']} speed="0.75s" />
      {message && (
        <Text mt={4} fontWeight="bold" fontSize={['sm', 'md', 'lg']}>
          {message}
        </Text>
      )}
    </Flex>
  );
};

export default LoadingSpinner;
