import { Either, left, right } from '@/core/errors/either/either'
import { User } from '../entities/user'
import { UserRepository } from '../repositories/user-repository'
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'

type Response = Either<NotFoundError, User>

type Request = {
	id: string
}

export class GetUserUserCase {
	constructor(private userRepository: UserRepository) {}

	async handle({ id }: Request): Promise<Response> {
		const user = await this.userRepository.findById(id)

		if (!user) {
			return left(new NotFoundError())
		}

		return right(user)
	}
}
