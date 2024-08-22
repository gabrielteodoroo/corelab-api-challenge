import { ListNotesUserCase } from '@/domain/user/use-cases/list-notes'
import { LoggedUser, UserPayload } from '@/infra/auth/logged-user'
import { NotePresenter } from '@/infra/presenters/note-presenter'
import { Controller, Get } from '@nestjs/common'

@Controller('/notes')
export class ListNotesController {
	constructor(private readonly listNotesUseCase: ListNotesUserCase) {}

	@Get()
	async handle(@LoggedUser() { id }: UserPayload) {
		const response = await this.listNotesUseCase.handle({ userId: id })

		return response.value.map(NotePresenter.toHTTP)
	}
}
