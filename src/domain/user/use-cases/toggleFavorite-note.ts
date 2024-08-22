import { Either, left, right } from '@/core/errors/either/either'
import { NoteRepository } from '../repositories/note-repository'
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'
import { UserRepository } from '../repositories/user-repository'

type Response = Either<NotFoundError, boolean>

type Request = {
	id: string
	userId: string
}

export class ToggleFavoriteNoteUseCase {
	constructor(
		private noteRepository: NoteRepository,
		private userRepository: UserRepository
	) {}

	async execute({ id, userId }: Request): Promise<Response> {
		const note = await this.noteRepository.findById({ id, userId })

		if (!note) {
			return left(new NotFoundError())
		}

		const user = await this.userRepository.findById(userId)

		if (!user) {
			return left(new NotFoundError())
		}

		note.isFavorite = !note.isFavorite

		await this.noteRepository.toggleNoteFavorite(note)

		return right(true)
	}
}
