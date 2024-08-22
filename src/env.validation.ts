import { plainToInstance } from 'class-transformer'
import {
	IsEnum,
	IsNumber,
	IsString,
	IsUrl,
	Max,
	Min,
	validateSync
} from 'class-validator'

enum Environment {
	Development = 'development',
	Production = 'production',
	Test = 'test',
	Provision = 'provision'
}

class EnvironmentVariables {
	@IsEnum(Environment)
	NODE_ENV: Environment

	@IsNumber()
	@Min(0)
	@Max(65535)
	PORT: number

	@IsUrl({ protocols: ['postgresql'], require_tld: false })
	DATABASE_URL: string

	@IsString()
	JWT_TOKEN: string
}

export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(EnvironmentVariables, config, {
		enableImplicitConversion: true
	})
	const errors = validateSync(validatedConfig, {
		skipMissingProperties: false
	})

	if (errors.length > 0) {
		throw new Error(errors.toString())
	}
	return validatedConfig
}
