import { Either, right } from '@/core/errors/either/either'
import { Note } from '../entities/note'
import { NoteRepository } from '../repositories/note-repository'

type Response = Either<null, Note[]>

type Request = {
	userId: string
}

export class ListNotesUserCase {
	constructor(private noteRepository: NoteRepository) {}

	async handle({ userId }: Request): Promise<Response> {
		const notes = await this.noteRepository.findMany(userId)

		return right(notes)
	}
}
