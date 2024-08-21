import { Either, left, right } from '@/core/errors/either/either'
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'
import { NoteRepository } from '../repositories/note-repository'
import { UserRepository } from '../repositories/user-repository'
import { NoteNotOwnedByUserError } from '@/core/errors/custom-errors/note-not-owned-by-user'

type Request = {
	noteId: string
	userId: string
}

type Response = Either<NotFoundError, boolean>

export class DeleteNoteUseCase {
	constructor(
		private noteRepository: NoteRepository,
		private userRepository: UserRepository
	) {}

	async handle({ noteId, userId }: Request): Promise<Response> {
		const note = await this.noteRepository.findById(noteId)

		if (!note) {
			return left(new NotFoundError())
		}

		if (note.userId !== userId) {
			return left(new NoteNotOwnedByUserError())
		}

		const user = await this.userRepository.findById(userId)

		if (!user) {
			return left(new NotFoundError())
		}

		await this.noteRepository.delete(noteId)

		return right(true)
	}
}
