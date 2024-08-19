import { BaseError } from '../base-error'

export class InvalidEmailError extends BaseError {
	constructor() {
		super('Invalid Email')
	}
}
