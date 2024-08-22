import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { GetUserUserCase } from '@/domain/user/use-cases/get-user'
import { UserPresenter } from '@/infra/presenters/user-presenter'

@Controller('/users/:id')
export class GetUserController {
	constructor(private readonly getUserUseCase: GetUserUserCase) {}

	@Get()
	async handle(@Param('id') id: string) {
		const response = await this.getUserUseCase.handle({ id })

		if (response.isLeft()) {
			throw new NotFoundException(response.value.message)
		}

		return UserPresenter.toHTTP(response.value)
	}
}
