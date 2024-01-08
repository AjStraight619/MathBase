module.exports = {
    transform: {
      "^.+\\.[t|j]sx?$": ["babel-jest", { configFile: "./babel.config.jest.js" }]
    },
    testEnvironment: 'node',
    // ... other configurations ...
  };