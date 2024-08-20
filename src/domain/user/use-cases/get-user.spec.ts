import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository'
import { User } from '../entities/user'
import Email from '@/domain/shared/email'
import { GetUserUserCase } from './get-user'

let userRepository: InMemoryUserRepository
let useCase: GetUserUserCase

describe('GetUserUseCase', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository()
		useCase = new GetUserUserCase(userRepository)
	})

	test('should return a user', async () => {
		const user = User.create({
			name: 'valid_name',
			email: Email.create('valid_email@email.com'),
			password: 'valid_password'
		})

		userRepository.items.push(user)

		const response = await useCase.handle({ id: user.id.toString() })

		expect(userRepository.items[0]).toEqual(response.value)
		expect(response.isRight()).toBe(true)
	})

	test('should return null if the user does not exist', async () => {
		const response = await useCase.handle({ id: 'invalid_id' })

		expect(response.isLeft()).toBe(true)
	})
})
