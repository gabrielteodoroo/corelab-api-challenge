import { PartialType } from '@nestjs/swagger'
import { CreateNoteDTO } from './create-note.dto'
import { IsBoolean, IsString } from 'class-validator'

export class EditNoteDTO extends PartialType(CreateNoteDTO) {
	@IsString()
	color: string

	@IsBoolean()
	isFavorite: boolean
}
