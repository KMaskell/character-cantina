
import type { Config } from '@jest/types';
 
const config: Config.InitialOptions = {
  testEnvironment: 'jest-fixed-jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '@chakra-ui/utils/context':
      '<rootDir>/node_modules/@chakra-ui/utils/dist/cjs/context',
    '@chakra-ui/utils/(.*)':
      '<rootDir>/node_modules/@chakra-ui/utils/dist/cjs/$1',
    '@chakra-ui/react/(.*)':
      '<rootDir>/node_modules/@chakra-ui/react/dist/cjs/$1',
    '@chakra-ui/(.*)': '<rootDir>/node_modules/@chakra-ui/$1/dist/cjs/index',
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@chakra-ui|@emotion|framer-motion)/)',
  ],
};
 
export default config;
 