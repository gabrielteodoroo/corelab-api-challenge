import {
	Body,
	Controller,
	HttpCode,
	Post,
	UnauthorizedException
} from '@nestjs/common'
import { Public } from '@/infra/auth/public'
import { LoginDTO } from '../dtos/login.dto'
import { AuthUserUseCase } from '@/domain/user/use-cases/auth-user'
import { LoginUserPresenter } from '@/infra/presenters/login-user-presenter'

@Controller('/login')
@Public()
export class LoginController {
	constructor(private readonly authUser: AuthUserUseCase) {}

	@Post()
	@HttpCode(200)
	async handle(@Body() body: LoginDTO) {
		const { email, password } = body
		const response = await this.authUser.handle({
			email,
			password
		})

		if (response.isLeft()) {
			throw new UnauthorizedException(response.value.message)
		}

		const { user, token } = response.value

		return {
			token,
			user: LoginUserPresenter.toHTTP(user)
		}
	}
}
