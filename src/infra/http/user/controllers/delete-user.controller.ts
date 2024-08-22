import {
	BadRequestException,
	Controller,
	Delete,
	HttpCode,
	NotFoundException,
	Param
} from '@nestjs/common'
import { DeleteUserUseCase } from '@/domain/user/use-cases/delete-user'
import { LoggedUser, UserPayload } from '@/infra/auth/logged-user'

@Controller('/users/:id')
export class DeleteUserController {
	constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

	@Delete()
	@HttpCode(204)
	async handle(@Param('id') id: string, @LoggedUser() user: UserPayload) {
		if (user.id === id) {
			throw new BadRequestException('You cannot delete yourself')
		}

		const response = await this.deleteUserUseCase.handle({
			id
		})

		if (response.isLeft()) {
			throw new NotFoundException(response.value.message)
		}
	}
}
