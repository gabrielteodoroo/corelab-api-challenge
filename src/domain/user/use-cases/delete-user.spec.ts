import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository'
import { User } from '../entities/user'
import Email from '@/domain/shared/email'
import { DeleteUserUseCase } from './delete-user'
import { Identity } from '@/core/entities/identity'

let userRepository: InMemoryUserRepository
let useCase: DeleteUserUseCase

describe('DeleteUserUseCase', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository()
		useCase = new DeleteUserUseCase(userRepository)

		const user = User.create(
			{
				name: 'valid_name',
				email: Email.create('valid_email@email.com'),
				password: 'valid_password'
			},
			new Identity('valid_id')
		)

		userRepository.items.push(user)
	})

	test('should delete a user', async () => {
		expect(userRepository.items).toHaveLength(1)

		const response = await useCase.handle({ id: 'valid_id' })

		expect(response.isRight()).toBe(true)
		expect(userRepository.items).toHaveLength(0)
	})

	test('should return a NotFoundError if the user does not exist', async () => {
		const response = await useCase.handle({ id: 'invalid_id' })

		expect(response.isLeft()).toBe(true)
		expect(response.value).toBeInstanceOf(Error)
	})
})
