import { User } from '@/domain/user/entities/user'

export class LoginUserPresenter {
	static toHTTP(user: User) {
		return {
			id: user.id.toString(),
			name: user.name,
			email: user.email.value
		}
	}
}
