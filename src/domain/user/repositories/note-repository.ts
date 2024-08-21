import { Note } from '../entities/note'

export abstract class NoteRepository {
	abstract create(user: Note): Promise<Note>
	abstract findMany(): Promise<Note[]>
	abstract findById(id: string): Promise<Note | null>
	abstract save(note: Note): Promise<void>
	abstract delete(id: string): Promise<void>
	abstract toggleNoteFavorite(note: Note): Promise<void>
}
