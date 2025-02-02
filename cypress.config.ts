import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.ts', 
    screenshotOnRunFailure: true,
    video: true,
    viewportWidth: 1000,
    viewportHeight: 660,
    env: {
      API_URL: 'https://api.example.com',
    },
  },

  defaultCommandTimeout: 8000,
});
