import {
	Controller,
	Delete,
	HttpCode,
	NotFoundException,
	Param
} from '@nestjs/common'
import { LoggedUser, UserPayload } from '@/infra/auth/logged-user'
import { DeleteNoteUseCase } from '@/domain/user/use-cases/delete-note'

@Controller('/notes/:id')
export class DeleteNoteController {
	constructor(private readonly deleteNoteUseCase: DeleteNoteUseCase) {}

	@Delete()
	@HttpCode(204)
	async handle(@Param('id') id: string, @LoggedUser() user: UserPayload) {
		const response = await this.deleteNoteUseCase.handle({
			noteId: id,
			userId: user.id
		})

		if (response.isLeft()) {
			throw new NotFoundException(response.value.message)
		}
	}
}
