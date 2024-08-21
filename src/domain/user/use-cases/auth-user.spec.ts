import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository'
import { HashRepository } from '../services/hash-repository'
import { AuthUserUseCase } from './auth-user'
import { TokenSimulator } from '../../../../test/services/token'
import { HashSimulator } from '../../../../test/services/hash-simulator'
import { User } from '../entities/user'
import Email from '@/domain/shared/email'

let userRepository: InMemoryUserRepository
let hashRepository: HashRepository
let tokenRepository: TokenSimulator
let useCase: AuthUserUseCase

describe('AuthUSerUseCase', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository()
		hashRepository = new HashSimulator()
		tokenRepository = new TokenSimulator()
		useCase = new AuthUserUseCase(
			userRepository,
			hashRepository,
			tokenRepository
		)
	})
	test('Should authenticate an user', async () => {
		const hashedPassword = await hashRepository.hash('valid_password')

		const user = User.create({
			name: 'valid_name',
			email: Email.create('valid_email@email.com'),
			password: hashedPassword
		})

		userRepository.items.push(user)

		const response = await useCase.handle({
			email: 'valid_email@email.com',
			password: 'valid_password'
		})

		expect(response.isRight()).toBe(true)
		expect(response.value).toEqual({
			token: expect.any(String),
			user: expect.any(User)
		})
	})

	test('Should not authenticate an user with invalid email', async () => {
		const hashedPassword = await hashRepository.hash('valid_password')

		const user = User.create({
			name: 'valid_name',
			email: Email.create('valid_email@email.com'),
			password: hashedPassword
		})

		userRepository.items.push(user)

		const response = await useCase.handle({
			email: 'valid_email@email',
			password: 'valid_password'
		})

		expect(response.isLeft()).toBe(true)
	})

	test('Should not authenticate an user with invalid password', async () => {
		const hashedPassword = await hashRepository.hash('valid_password')

		const user = User.create({
			name: 'valid_name',
			email: Email.create('valid_email@email.com'),
			password: hashedPassword
		})

		userRepository.items.push(user)

		const response = await useCase.handle({
			email: 'valid_email@email.com',
			password: 'invalid_password'
		})

		expect(response.isLeft()).toBe(true)
	})
})
