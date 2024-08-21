import { Either, right } from '@/core/errors/either/either'
import { Note } from '../entities/note'
import { NoteRepository } from '../repositories/note-repository'

type Response = Either<null, Note[]>

export class ListNotesUserCase {
	constructor(private noteRepository: NoteRepository) {}

	async handle(): Promise<Response> {
		const notes = await this.noteRepository.findMany()

		return right(notes)
	}
}
