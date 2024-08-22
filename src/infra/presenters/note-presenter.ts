import { Note } from '@/domain/user/entities/note'

export class NotePresenter {
	static toHTTP(note: Note) {
		return {
			id: note.id.toString(),
			createdAt: note.createdAt,
			updatedAt: note.updatedAt,
			title: note.title,
			text: note.text,
			color: note.color.value,
			userId: note.userId,
			isFavorite: note.isFavorite
		}
	}
}
