
import '@testing-library/jest-dom';
import { ReactNode } from 'react';
import 'cross-fetch/polyfill';
 
import { BroadcastChannel } from 'worker_threads';
 
Reflect.set(globalThis, 'BroadcastChannel', BroadcastChannel);
 
class CustomTextEncoder {
  encode(input?: string): Uint8Array {
    return new Uint8Array(Buffer.from(input || ''));
  }
}
 
class CustomTextDecoder {
  decode(input?: Uint8Array): string {
    return Buffer.from(input || []).toString();
  }
}
 
Object.assign(global, {
  TextEncoder: CustomTextEncoder,
  TextDecoder: CustomTextDecoder,
});
 
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }: { children: ReactNode }) => children,
  // Routes: ({ children }: { children: ReactNode }) => children,
  // Route: ({ children }: { children: ReactNode }) => children,
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    pathname: '/',
    search: '',
    hash: '',
    state: null,
    key: '5nvxpbdafa',
  }),
  // useParams: () => ({}),
}));
 
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}
 
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: useLayoutEffect does nothing on the server')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});
 
afterAll(() => {
  console.error = originalError;
});
 