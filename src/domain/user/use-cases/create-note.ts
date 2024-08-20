import { Either, left, right } from '@/core/errors/either/either'
import { NoteRepository } from '../repositories/note-repository'
import { Note } from '../entities/note'
import { UserRepository } from '../repositories/user-repository'
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'

type Response = Either<NotFoundError, Note>

type Request = {
	userId: string
	title: string
	text: string
}

export class CreateNoteUseCase {
	constructor(
		private noteRepository: NoteRepository,
		private userRepository: UserRepository
	) {}

	async handle({ title, userId, text }: Request): Promise<Response> {
		const userExists = await this.userRepository.findById(userId)

		if (!userExists) {
			return left(new NotFoundError())
		}

		const createdNote = Note.create({
			title,
			userId,
			text
		})

		await this.noteRepository.create(createdNote)

		return right(createdNote)
	}
}
