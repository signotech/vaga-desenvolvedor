// jest.config.ts
const ignoredErrors = [
  /act(...) is not supported in production builds of React, and might not behave as expected./,
];

const consoleError = global.console.error;
global.console.error = (...args: any[]) => {
  if (ignoredErrors.some((el) => el.test(args[0]))) {
    return consoleError(...args);
  }
};

export default {
  projects: [
    {
      preset: "ts-jest",
      displayName: "dom",
      testEnvironment: "jsdom",
      testMatch: ["**/*.test.tsx"],
      coverageDirectory: "./coverage",
      transform: {
        "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
      },
      transformIgnorePatterns: ["/node_modules/"],
      moduleNameMapper: {
        "^.+\\.(css|less|scss)$": "identity-obj-proxy",
        "^.+\\.module\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "^@/(.*)$": "<rootDir>/src/$1",
      },
    },
    {
      preset: "ts-jest",
      displayName: "node",
      coverageDirectory: "./coverage",
      testEnvironment: "node",
      moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
      testMatch: ["**/*.test.ts"],
    },
  ],
} as const;
