import { Outlet } from 'react-router-dom';
import React, { FC, ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

interface AppLayoutProps {
  navigation: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ navigation }) => (
  <Flex
    width="100%"
    height="100vh"
    direction="column"
    minHeight="0"
    maxHeight="100vh"
    bg="gray.100"
    bgImage="url('/starry-background.jpg')"
    bgSize="cover"
    bgPosition="center"
    color="yellow.400"
  >
    <Flex py="2" height="48px">
      {navigation}
    </Flex>
    <Flex flexGrow="1" direction="column" minHeight="0" overflow="auto">
      <Outlet />
    </Flex>
  </Flex>
);

export default AppLayout;
