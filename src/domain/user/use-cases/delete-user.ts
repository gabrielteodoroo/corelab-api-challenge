import { Either, left, right } from '@/core/errors/either/either'
import { UserRepository } from '../repositories/user-repository'
import { NotFoundError } from '@/core/errors/custom-errors/not-found-error'

type Request = {
	id: string
}

type Response = Either<NotFoundError, boolean>

export class DeleteUserUseCase {
	constructor(private userRepository: UserRepository) {}

	async handle({ id }: Request): Promise<Response> {
		const user = await this.userRepository.findById(id)

		if (!user) {
			return left(new NotFoundError())
		}

		await this.userRepository.delete(id)

		return right(true)
	}
}
