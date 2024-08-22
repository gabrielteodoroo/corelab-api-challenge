import { Config } from 'jest'
import { compilerOptions } from './tsconfig.json'
import { pathsToModuleNameMapper } from 'ts-jest'

const paths = pathsToModuleNameMapper(compilerOptions.paths, {
	prefix: '<rootDir>/'
})

const config: Config = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: '.',
	testEnvironment: 'node',
	testRegex: '.e2e-spec.ts$',
	moduleNameMapper: {
		...paths
	},
	setupFilesAfterEnv: ['./test/setup-database.ts'],
	preset: 'ts-jest'
}

export default config
