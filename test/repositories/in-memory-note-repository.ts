import { Note } from '@/domain/user/entities/note'
import { NoteRepository } from '@/domain/user/repositories/note-repository'

export class InMemoryNoteRepository extends NoteRepository {
	items: Note[] = []

	async create(note: Note) {
		this.items.push(note)
		return note
	}

	async findMany() {
		return this.items
	}

	async findById(id: string) {
		return this.items.find(item => item.id.toString() === id) || null
	}
}
