import { Identity } from '@/core/entities/identity'
import Color from '@/domain/shared/color'
import { Note } from '@/domain/user/entities/note'
import { Note as NoteDatabase } from '@prisma/client'

export class NotePrismaMapper {
	static toDomain(note: NoteDatabase): Note {
		return Note.create(
			{
				title: note.title,
				userId: note.userId,
				color: Color.create(note.color),
				createdAt: note.createdAt,
				isFavorite: note.isFavorite,
				text: note.text
			},
			new Identity(note.id)
		)
	}
	static toPersistence(note: Note): NoteDatabase {
		return {
			id: note.id.toString(),
			createdAt: note.createdAt,
			updatedAt: note.updatedAt,
			userId: note.userId,
			title: note.title,
			text: note.text,
			color: note.color.value,
			isFavorite: note.isFavorite
		}
	}
}
