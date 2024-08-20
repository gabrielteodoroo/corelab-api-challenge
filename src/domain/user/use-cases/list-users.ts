import { Either, right } from '@/core/errors/either/either'
import { User } from '../entities/user'
import { UserRepository } from '../repositories/user-repository'

type Response = Either<null, User[]>

export class ListUserUserCase {
	constructor(private userRepository: UserRepository) {}

	async handle(): Promise<Response> {
		const users = await this.userRepository.findMany()

		return right(users)
	}
}
