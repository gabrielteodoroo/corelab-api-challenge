import { Either, left, right } from '@/core/errors/either/either'
import { UserRepository } from '../repositories/user-repository'
import { HashRepository } from '../services/hash-repository'
import { TokenRepository } from '../services/token-repository'
import { InvalidCredentialsError } from '@/core/errors/custom-errors/invalid-credentials-error'
import { User } from '../entities/user'

type Request = {
	email: string
	password: string
}

type Response = Either<InvalidCredentialsError, { user: User; token: string }>

export class AuthUserUseCase {
	constructor(
		private userRepository: UserRepository,
		private hashRepository: HashRepository,
		private tokenRepository: TokenRepository
	) {}

	async handle({ email, password }: Request): Promise<Response> {
		const user = await this.userRepository.findByEmail(email)

		if (!user) {
			return left(new InvalidCredentialsError())
		}

		const isValidPassword = await this.hashRepository.compare(
			password,
			user.password
		)

		if (!isValidPassword) {
			return left(new InvalidCredentialsError())
		}

		const token = this.tokenRepository.generate({
			id: user.id.toString(),
			email: user.email.value,
			name: user.name
		})

		return right({ user, token })
	}
}
