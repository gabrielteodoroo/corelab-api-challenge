import { BaseError } from '../base-error'

export class NoteNotOwnedByUserError extends BaseError {
	constructor() {
		super('Note not owned by user')
	}
}
