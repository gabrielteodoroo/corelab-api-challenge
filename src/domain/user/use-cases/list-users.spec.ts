import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository'
import { ListUserUserCase } from './list-users'
import { User } from '../entities/user'
import Email from '@/domain/shared/email'

let userRepository: InMemoryUserRepository
let useCase: ListUserUserCase

describe('ListUsersUseCase', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository()
		useCase = new ListUserUserCase(userRepository)
	})

	test('should list all users', async () => {
		const user = User.create({
			name: 'valid_name',
			email: Email.create('valid_email@email.com'),
			password: 'valid_password'
		})

		userRepository.items.push(user)

		const response = await useCase.handle()

		expect(response.isRight()).toBe(true)
		expect(response.value).toHaveLength(1)
	})

	test('should return an empty array if there are no users', async () => {
		const response = await useCase.handle()

		expect(response.isRight()).toBe(true)
		expect(response.value).toHaveLength(0)
	})
})
