module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["**/__test__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png)$": "identity-obj-proxy",
  },
  // setupFilesAfterEnv: ["<rootDir>/src/__test__/setupTests.js"],
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/src/__test__/"],
  collectCoverageFrom: ["src/**/*.{js,jsx,mjs}"],
  // "nodeOptions": ["--experimental-vm-modules"],
};
