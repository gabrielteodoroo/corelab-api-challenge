import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export type UserPayload = {
	id: string
	name: string
	email: string
}

export const LoggedUser = createParamDecorator(
	(_: never, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest()
		return request.user as UserPayload
	}
)
