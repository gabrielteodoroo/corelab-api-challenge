import { Either, left, right } from '@/core/errors/either/either'
import { UserRepository } from '../repositories/user-repository'
import { HashRepository } from '../services/hash-repository'
import { User } from '../entities/user'
import { InvalidEmailError } from '@/core/errors/custom-errors/invalid-email-error'
import Email from '@/domain/shared/email'
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'

type Request = {
	id: string
	name: string
	email: string
	password: string
}

type Response = Either<NotFoundError | InvalidEmailError, User>

export class EditUserUseCase {
	constructor(
		private userRepository: UserRepository,
		private hashRepository: HashRepository
	) {}

	async handle({ id, email, name, password }: Request): Promise<Response> {
		const user = await this.userRepository.findById(id)

		if (!user) {
			return left(new NotFoundError())
		}

		const userEmail = Email.create(email)

		if (!userEmail.validate()) {
			return left(new InvalidEmailError())
		}

		const emailAlreadyExists = await this.userRepository.findByEmail(email)

		if (emailAlreadyExists && emailAlreadyExists.id.toString() !== id) {
			return left(new InvalidEmailError())
		}

		const hashedPassword = await this.hashRepository.hash(password)

		user.email = userEmail
		user.name = name
		user.password = hashedPassword
		user.updatedAt = new Date()

		await this.userRepository.save(user)

		return right(user)
	}
}
