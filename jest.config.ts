import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "@/components/(.*)": "<rootDir>/src/components/$1",
    "@/types/(.*)": "<rootDir>/src/types/$1",
    "@/utils/(.*)": "<rootDir>/src/utils/$1",
  },
};

export default createJestConfig(config);
