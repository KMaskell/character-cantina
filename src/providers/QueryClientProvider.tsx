import React, { FC, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
interface Props {
  children: ReactNode;
}
const TanstackQueryClientProvider: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
export default TanstackQueryClientProvider;
