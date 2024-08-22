import { CreateUserUseCase } from '@/domain/user/use-cases/create-user'
import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	Post
} from '@nestjs/common'
import { CreateUserDTO } from '../dtos/create-user.dto'
import { UserPresenter } from '@/infra/presenters/user-presenter'

@Controller('/user')
export class CreateUserController {
	constructor(private readonly createUserUseCase: CreateUserUseCase) {}

	@Post()
	@HttpCode(201)
	async handle(@Body() body: CreateUserDTO) {
		const { email, name, password } = body

		const response = await this.createUserUseCase.handle({
			email,
			name,
			password
		})

		if (response.isLeft()) {
			throw new BadRequestException(response.value.message)
		}

		return UserPresenter.toHTTP(response.value)
	}
}
