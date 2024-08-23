import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { GetNoteUserCase } from '@/domain/user/use-cases/get-note'
import { LoggedUser, UserPayload } from '@/infra/auth/logged-user'
import { NotePresenter } from '@/infra/presenters/note-presenter'

@Controller('/notes/:id')
export class GetNoteController {
	constructor(private readonly getNoteUseCase: GetNoteUserCase) {}

	@Get()
	async handle(@Param('id') id: string, @LoggedUser() user: UserPayload) {
		const response = await this.getNoteUseCase.handle({
			id,
			userId: user.id
		})

		if (response.isLeft()) {
			throw new NotFoundException(response.value.message)
		}

		return NotePresenter.toHTTP(response.value)
	}
}
