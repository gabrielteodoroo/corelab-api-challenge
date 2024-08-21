import { Either, left, right } from '@/core/errors/either/either'
import { NoteRepository } from '../repositories/note-repository'
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'
import { NoteNotOwnedByUserError } from '@/core/errors/custom-errors/note-not-owned-by-user'
import { UserRepository } from '../repositories/user-repository'

type Response = Either<NotFoundError | NoteNotOwnedByUserError, boolean>

type Request = {
	noteId: string
	userId: string
	favorite: boolean
}

export class FavoriteNoteUseCase {
	constructor(
		private noteRepository: NoteRepository,
		private userRepository: UserRepository
	) {}

	async execute({ favorite, noteId, userId }: Request): Promise<Response> {
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

		note.isFavorite = favorite

		await this.noteRepository.save(note)

		return right(true)
	}
}
