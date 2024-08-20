import { Note } from '../entities/note'

export abstract class NoteRepository {
	abstract create(user: Note): Promise<Note>
}
