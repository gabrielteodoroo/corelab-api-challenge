import { Note } from '../entities/note'

type TFindById = {
	id: string
	userId: string
}

export abstract class NoteRepository {
	abstract create(user: Note): Promise<Note>
	abstract findMany(userId: string): Promise<Note[]>
	abstract findById({ id, userId }: TFindById): Promise<Note | null>
	abstract save(note: Note): Promise<void>
	abstract delete(id: string): Promise<void>
	abstract toggleNoteFavorite(note: Note): Promise<void>
}
