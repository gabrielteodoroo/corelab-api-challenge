import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository'
import { HashRepository } from '../services/hash-repository'
import { CreateUserUseCase } from './create-user'
import { HashSimulator } from '../../../../test/services/hash-simulator'

let userRepository: InMemoryUserRepository
let hashRepository: HashRepository
let useCase: CreateUserUseCase
describe('CreateUserUseCase', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository()
		hashRepository = new HashSimulator()
		useCase = new CreateUserUseCase(userRepository, hashRepository)
	})
	test('Should create a user.', async () => {
		const user = await useCase.handle({
			email: 'valid_email@email.com',
			name: 'valid_name',
			password: 'valid_password'
		})

		const hashedPassword = await hashRepository.hash('valid_password')

		expect(user.isRight()).toBe(true)
		expect(user.value).toHaveProperty('id')
		expect(userRepository.items[0].password).toBe(hashedPassword)
		expect(userRepository.items[0].name).toBe('valid_name')
		expect(userRepository.items[0].email.value).toBe(
			'valid_email@email.com'
		)
		expect(userRepository.items[0].createdAt).toBeInstanceOf(Date)
		expect(userRepository.items[0].updatedAt).toBeInstanceOf(Date)
	})

	test('Should not create a user with an already registered email.', async () => {
		await useCase.handle({
			email: 'valid_email@email.com',
			name: 'valid_name',
			password: 'valid_password'
		})

		const user2 = await useCase.handle({
			email: 'valid_email@email.com',
			name: 'valid_name',
			password: 'valid_password'
		})

		expect(user2.isLeft()).toBe(true)
	})

	test('Should not create a user with an invalid email.', async () => {
		const user = await useCase.handle({
			email: 'invalid_email@email',
			name: 'valid_name',
			password: 'valid_password'
		})

		expect(user.isLeft()).toBe(true)
	})
})
