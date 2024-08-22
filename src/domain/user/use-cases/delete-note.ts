import { Either, left, right } from '@/core/errors/either/either'
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'
import { NoteRepository } from '../repositories/note-repository'

type Request = {
	noteId: string
	userId: string
}

type Response = Either<NotFoundError, boolean>

export class DeleteNoteUseCase {
	constructor(private noteRepository: NoteRepository) {}

	async handle({ noteId, userId }: Request): Promise<Response> {
		const note = await this.noteRepository.findById({ id: noteId, userId })

		if (!note) {
			return left(new NotFoundError())
		}

		await this.noteRepository.delete(noteId)

		return right(true)
	}
}
