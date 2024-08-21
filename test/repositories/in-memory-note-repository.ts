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

	async save(note: Note) {
		const index = this.items.findIndex(
			item => item.id.toString() === note.id.toString()
		)
		this.items[index] = note
	}

	async delete(id: string): Promise<void> {
		const index = this.items.findIndex(user => user.id.toString() === id)

		this.items.splice(index, 1)
	}

	async toggleNoteFavorite(note: Note): Promise<void> {
		const index = this.items.findIndex(
			item => item.id.toString() === note.id.toString()
		)
		this.items[index] = note
	}
}
