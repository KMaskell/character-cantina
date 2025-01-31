import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

const AllProviders = ({ children }: { children: ReactNode }) => (
  <BrowserRouter>
    <ChakraProvider>{children}</ChakraProvider>
  </BrowserRouter>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
