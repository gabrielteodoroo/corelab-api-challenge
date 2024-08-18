/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

import { compilerOptions } from './tsconfig.json'
import { pathsToModuleNameMapper } from 'ts-jest'

const paths = pathsToModuleNameMapper(compilerOptions.paths, {
	prefix: '<rootDir>/'
})

const config: Config = {
  moduleNameMapper: {
    ...paths
  },
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
};

export default config;
