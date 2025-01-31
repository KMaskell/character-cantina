import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import QueryClientProvider from './providers/QueryClientProvider';
import { ChakraProvider } from '@chakra-ui/react';

const RootComponent = () => {
  return (
    <StrictMode>
      <QueryClientProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(<RootComponent />);
