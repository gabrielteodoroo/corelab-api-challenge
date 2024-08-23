import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	NotFoundException,
	Param,
	Put
} from '@nestjs/common'
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'
import { EditNoteUseCase } from '@/domain/user/use-cases/edit-note'
import { EditNoteDTO } from '../dtos/edit-note.dto'
import { LoggedUser, UserPayload } from '@/infra/auth/logged-user'
import { NotePresenter } from '@/infra/presenters/note-presenter'

@Controller('/notes/:id')
export class EditNoteController {
	constructor(private readonly editNoteUseCase: EditNoteUseCase) {}

	@Put()
	@HttpCode(204)
	async handle(
		@Param('id') id: string,
		@Body() body: EditNoteDTO,
		@LoggedUser() user: UserPayload
	) {
		const { color, isFavorite, text, title } = body

		const response = await this.editNoteUseCase.handle({
			id,
			color,
			isFavorite,
			text,
			title,
			userId: user.id
		})

		if (response.isLeft()) {
			if (response.value.constructor === NotFoundError) {
				throw new NotFoundException(response.value.message)
			}
			throw new BadRequestException(response.value.message)
		}

		return NotePresenter.toHTTP(response.value)
	}
}
