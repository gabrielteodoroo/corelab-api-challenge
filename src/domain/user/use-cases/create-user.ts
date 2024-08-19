import { Either, left, right } from '@/core/errors/either/either'
import { UserRepository } from '../repositories/user-repository'
import { HashRepository } from '../services/hash-repository'
import { NotAllowedError } from '@/core/errors/custom-errors/not-allowed-error'
import { User } from '../entities/user'
import { InvalidEmailError } from '@/core/errors/custom-errors/invalid-email-error'
import Email from '@/domain/shared/email'

type Request = {
	name: string
	email: string
	password: string
}

type Response = Either<NotAllowedError | InvalidEmailError, User>

export class CreateUserUseCase {
	constructor(
		private userRepository: UserRepository,
		private hashRepository: HashRepository
	) {}

	async handle({ email, name, password }: Request): Promise<Response> {
		const userAlreadyExists = await this.userRepository.findByEmail(email)

		if (userAlreadyExists) {
			return left(new NotAllowedError())
		}

		const userEmail = Email.create(email)

		if (!userEmail.validate()) {
			return left(new InvalidEmailError())
		}

		const hashedPassword = await this.hashRepository.hash(password)

		const user = User.create({
			email: userEmail,
			name,
			password: hashedPassword
		})

		await this.userRepository.create(user)

		return right(user)
	}
}
