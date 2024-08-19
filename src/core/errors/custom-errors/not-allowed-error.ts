import { BaseError } from '../base-error'

export class NotAllowedError extends BaseError {
	constructor() {
		super('Not Allowed')
	}
}
