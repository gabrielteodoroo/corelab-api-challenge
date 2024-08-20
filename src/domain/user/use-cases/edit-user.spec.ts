import { HashSimulator } from '../../../../test/services/hash-simulator'
import { HashRepository } from '../services/hash-repository'
import { EditUserUseCase } from './edit-user'
import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository'
import Email from '@/domain/shared/email'
import { User } from '../entities/user'

let hashRepository: HashRepository
let useCase: EditUserUseCase
let userRepository: InMemoryUserRepository

describe('EditUserUseCase', () => {
	beforeEach(async () => {
		hashRepository = new HashSimulator()
		userRepository = new InMemoryUserRepository()
		useCase = new EditUserUseCase(userRepository, hashRepository)
	})
	test('should not edit a user if an invalid email is provided', async () => {
		const user = User.create({
			name: 'valid_name',
			email: Email.create('valid_email@email.com'),
			password: 'valid_password'
		})

		userRepository.items.push(user)

		const response = await useCase.handle({
			id: user.id.toString(),
			name: 'valid_name',
			email: 'invalid_email',
			password: 'valid_password'
		})

		expect(response.isLeft()).toBe(true)
	})

	test('should not edit a user if the user does not exist', async () => {
		const response = await useCase.handle({
			id: 'invalid_id',
			name: 'valid_name',
			email: 'valid_email',
			password: 'valid_password'
		})

		expect(response.isLeft()).toBe(true)
	})

	test('should not edit a user if the email is already in use', async () => {
		const user1 = User.create({
			name: 'valid_name',
			email: Email.create('valid_email@email.com'),
			password: 'valid_password'
		})

		userRepository.items.push(user1)

		const user2 = User.create({
			name: 'valid_name',
			email: Email.create('valid_email2@email.com'),
			password: 'valid_password'
		})

		userRepository.items.push(user2)

		const response = await useCase.handle({
			id: user1.id.toString(),
			name: 'valid_name',
			email: user2.email.value,
			password: 'valid_password'
		})

		expect(response.isLeft()).toBe(true)
	})

	test('should edit a user', async () => {
		const user = User.create({
			name: 'valid_name',
			email: Email.create('valid_email@email.com'),
			password: 'valid_password'
		})

		userRepository.items.push(user)

		const response = await useCase.handle({
			id: user.id.toString(),
			name: 'new_name',
			email: 'new_email@email.com',
			password: 'new_password'
		})

		const hashedPassword = await hashRepository.hash('new_password')

		expect(response.isRight()).toBe(true)
		expect(userRepository.items[0].name).toBe('new_name')
		expect(userRepository.items[0].email.value).toBe('new_email@email.com')
		expect(userRepository.items[0].password).toBe(hashedPassword)
		expect(userRepository.items[0].updatedAt).not.toBe(
			userRepository.items[0].createdAt
		)
	})
})
