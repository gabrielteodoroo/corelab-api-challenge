import { Either, left, right } from '@/core/errors/either/either'
import { UserRepository } from '../repositories/user-repository'
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'
import { NoteRepository } from '../repositories/note-repository'
import { Note } from '../entities/note'

type Request = {
	id: string
	userId: string
	title: string
	text: string
	color: string
	isFavorite: boolean
	createdAt: Date
	updatedAt: Date
}

type Response = Either<NotFoundError, Note>

export class EditNoteUseCase {
	constructor(
		private userRepository: UserRepository,
		private noteRepository: NoteRepository
	) {}

	async handle(data: Request): Promise<Response> {
		const note = await this.noteRepository.findById(data.id)

		if (!note) {
			return left(new NotFoundError())
		}

		const userExists = await this.userRepository.findById(data.userId)

		if (!userExists) {
			return left(new NotFoundError())
		}

		note.updatedAt = new Date()
		note.title = data.title
		note.color = data.color
		note.isFavorite = data.isFavorite
		note.text = data.text

		await this.noteRepository.save(note)

		return right(note)
	}
}
