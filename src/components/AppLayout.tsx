import { Outlet } from 'react-router-dom';
import React, { FC, ReactNode } from 'react';
import { Box, Container, VStack } from '@chakra-ui/react';

interface AppLayoutProps {
  children?: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = () => (
  <Box
    minH="100vh"
    bg="gray.100"
    bgImage="url('/starry-background.jpg')"
    bgSize="cover"
    bgPosition="center"
    color="yellow.400"
  >
    <Container maxW="container.xl" py={4}>
      <VStack spacing={4} align="stretch">
        <Outlet />
      </VStack>
    </Container>
  </Box>
);

export default AppLayout;
