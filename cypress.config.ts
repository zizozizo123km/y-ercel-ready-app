import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // We've updated the baseUrl to reflect the Facebook domain
    baseUrl: 'https://www.facebook.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // This is often used for tasks like reading environment variables, 
      // or integrating specialized reporters.
    },
    // Set viewport dimensions to simulate a desktop environment for standard testing
    viewportWidth: 1300,
    viewportHeight: 900,
    
    // Timeouts can be adjusted for external sites which might have slightly slower response times
    defaultCommandTimeout: 10000, // 10 seconds for commands
    pageLoadTimeout: 60000, // 60 seconds for page loads
  },
  
  // Component testing configuration (if needed)
  component: {
    devServer: {
      framework: 'react', // Placeholder: adjust based on the actual frontend framework if testing internal components
      bundler: 'webpack', // Placeholder
    },
  },
  
  // Other general configuration options
  video: false, // Videos are generally resource-intensive; set to true if required
  screenshotOnRunFailure: true,
  numTestsKeptInMemory: 50,
  
  // Ensure that Cypress ignores node_modules and other generated directories
  excludeSpecPattern: [
    '**/node_modules/**',
    '**/dist/**',
  ],
})