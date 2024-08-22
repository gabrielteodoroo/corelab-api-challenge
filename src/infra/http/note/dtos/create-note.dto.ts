import { IsNotEmpty } from 'class-validator'

export class CreateNoteDTO {
	@IsNotEmpty({ message: 'Title is required' })
	title: string

	@IsNotEmpty({ message: 'UserId is required' })
	userId: string

	@IsNotEmpty({ message: 'Text is required' })
	text: string
}
