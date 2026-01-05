const projectName = "Facebook";

export default {
  displayName: projectName,
  testEnvironment: "jsdom", // Typically used for React/web applications
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  rootDir: ".",
  roots: ["<rootDir>/src"],
  testPathIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    // Handling static assets (adjust paths as necessary for your project structure)
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg|eot|otf|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    // Example path mapping (adjust to your project's alias setup)
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    // Use ts-jest for TypeScript files
    "^.+\\.(ts|tsx)$": "ts-jest",
    // Use babel-jest for JavaScript/JSX files if needed, especially for older React features or specific Babel plugins
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    // Ignore node_modules except for specific modules that need transformation (e.g., ESM modules)
    "/node_modules/(?!(some-esm-module|another-module)/)",
  ],
  setupFilesAfterEnv: [
    // Setup file for Jest (e.g., importing jest-dom matchers)
    "<rootDir>/jest.setup.ts",
  ],
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.{ts,tsx,js,jsx}",
    "!src/**/*.d.ts",
    "!src/index.ts", // Example: exclude entry point
    "!src/reportWebVitals.ts", // Example: exclude boilerplate
  ],
  coverageThreshold: {
    // Optional: enforce minimum coverage percentages
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  clearMocks: true,
};