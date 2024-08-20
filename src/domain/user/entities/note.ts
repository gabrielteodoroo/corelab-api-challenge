import { Entity } from '@/core/entities/entity'
import { Identity } from '@/core/entities/identity'
import { Optional } from '@/core/types/optional'

type NoteType = {
	userId: string
	title: string
	text: string
	color: string
	isFavorite: boolean
	createdAt: Date
	updatedAt: Date
}

export class Note extends Entity<NoteType> {
	static create(
		data: Optional<
			NoteType,
			'text' | 'color' | 'isFavorite' | 'createdAt' | 'updatedAt'
		>,
		id?: Identity
	) {
		return new Note(
			{
				...data,
				isFavorite: data.isFavorite ?? false,
				color: data.color ?? '#FFFFFF',
				text: data.text ?? '',
				createdAt: data.createdAt ?? new Date(),
				updatedAt: data.updatedAt ?? new Date()
			},
			id
		)
	}

	get title(): string {
		return this.attributes.title
	}

	get text(): string {
		return this.attributes.text
	}

	get color(): string {
		return this.attributes.color
	}

	get isFavorite(): boolean {
		return this.attributes.isFavorite
	}

	get createdAt(): Date {
		return this.attributes.createdAt
	}

	get updatedAt(): Date {
		return this.attributes.updatedAt
	}

	get userId(): string {
		return this.attributes.userId
	}

	set userId(userId: string) {
		this.attributes.userId = userId
	}

	set title(title: string) {
		this.attributes.title = title
	}

	set text(text: string) {
		this.attributes.text = text
	}

	set color(color: string) {
		this.attributes.color = color
	}

	set isFavorite(isFavorite: boolean) {
		this.attributes.isFavorite = isFavorite
	}

	set updatedAt(updatedAt: Date) {
		this.attributes.updatedAt = updatedAt
	}
}
