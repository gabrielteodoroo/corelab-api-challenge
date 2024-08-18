import { Entity } from '@/core/entities/entity'
import { Identity } from '@/core/entities/identity'

type NoteType = {
	id: string
	title: string
	text: string
	color: string
	isFavorite: boolean
}

export class Note extends Entity<NoteType> {
	constructor(data: NoteType, id?: Identity) {
		super(data, id)
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
}
