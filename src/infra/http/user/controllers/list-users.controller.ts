import { ListUserUserCase } from '@/domain/user/use-cases/list-users'
import { UserPresenter } from '@/infra/presenters/user-presenter'
import { Controller, Get } from '@nestjs/common'

@Controller('/users')
export class ListUsersController {
	constructor(private readonly listUsersUseCase: ListUserUserCase) {}

	@Get()
	async handle() {
		const response = await this.listUsersUseCase.handle()

		return response.value.map(UserPresenter.toHTTP)
	}
}
