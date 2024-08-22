import {
	Body,
	Controller,
	HttpCode,
	NotFoundException,
	Post
} from '@nestjs/common'
import { Public } from '@/infra/auth/public'
import { CreateNoteUseCase } from '@/domain/user/use-cases/create-note'
import { NotePresenter } from '@/infra/presenters/note-presenter'
import { CreateNoteDTO } from '../dtos/create-note.dto'

@Controller('/notes')
@Public()
export class CreateNoteController {
	constructor(private readonly createNoteUseCase: CreateNoteUseCase) {}

	@Post()
	@HttpCode(201)
	async handle(@Body() body: CreateNoteDTO) {
		const { title, userId, text } = body

		const response = await this.createNoteUseCase.handle({
			title,
			userId,
			text
		})

		if (response.isLeft()) {
			throw new NotFoundException(response.value.message)
		}

		return NotePresenter.toHTTP(response.value)
	}
}
