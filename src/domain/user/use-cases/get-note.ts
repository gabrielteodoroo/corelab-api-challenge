import { Either, left, right } from '@/core/errors/either/either'
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'
import { Note } from '../entities/note'
import { NoteRepository } from '../repositories/note-repository'

type Response = Either<NotFoundError, Note>

type Request = {
	id: string
}

export class GetNoteUserCase {
	constructor(private noteRepository: NoteRepository) {}

	async handle({ id }: Request): Promise<Response> {
		const note = await this.noteRepository.findById(id)

		if (!note) {
			return left(new NotFoundError())
		}

		return right(note)
	}
}
