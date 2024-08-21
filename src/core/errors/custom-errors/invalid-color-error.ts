import { BaseError } from '../base-error'

export class InvalidColorError extends BaseError {
	constructor() {
		super('Invalid color: must be a valid hexadecimal color code.')
	}
}
