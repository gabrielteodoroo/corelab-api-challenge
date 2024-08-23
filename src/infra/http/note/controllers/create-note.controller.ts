import {
	Body,
	Controller,
	HttpCode,
	NotFoundException,
	Post
} from '@nestjs/common'
import { CreateNoteUseCase } from '@/domain/user/use-cases/create-note'
import { NotePresenter } from '@/infra/presenters/note-presenter'
import { CreateNoteDTO } from '../dtos/create-note.dto'
import { LoggedUser, UserPayload } from '@/infra/auth/logged-user'

@Controller('/notes')
export class CreateNoteController {
	constructor(private readonly createNoteUseCase: CreateNoteUseCase) {}

	@Post()
	@HttpCode(201)
	async handle(@Body() body: CreateNoteDTO, @LoggedUser() user: UserPayload) {
		const { title, text } = body

		const response = await this.createNoteUseCase.handle({
			title,
			userId: user.id,
			text
		})

		if (response.isLeft()) {
			throw new NotFoundException(response.value.message)
		}

		return NotePresenter.toHTTP(response.value)
	}
}
