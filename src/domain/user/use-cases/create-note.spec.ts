import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository'
import { InMemoryNoteRepository } from '../../../../test/repositories/in-memory-note-repository'
import { CreateNoteUseCase } from './create-note'
import { User } from '../entities/user'
import Email from '@/domain/shared/email'
import { Identity } from '@/core/entities/identity'

let userRepository: InMemoryUserRepository
let noteRepository: InMemoryNoteRepository
let useCase: CreateNoteUseCase
describe('CreateUserUseCase', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository()
		noteRepository = new InMemoryNoteRepository()
		useCase = new CreateNoteUseCase(noteRepository, userRepository)
	})
	test('Should create a user.', async () => {
		const user = User.create(
			{
				email: Email.create('valid_email@email.com'),
				name: 'valid_name',
				password: 'valid_password'
			},
			new Identity('1')
		)

		userRepository.items.push(user)

		const note = await useCase.handle({
			title: 'valid_title',
			userId: user.id.toString(),
			text: 'valid_text'
		})

		expect(note.isRight()).toBe(true)
		expect(noteRepository.items[0].id).toBeInstanceOf(Identity)
		expect(noteRepository.items[0].title).toBe('valid_title')
		expect(noteRepository.items[0].userId).toBe(user.id.toString())
		expect(noteRepository.items[0].text).toBe('valid_text')
		expect(noteRepository.items[0].createdAt).toBeInstanceOf(Date)
		expect(noteRepository.items[0].updatedAt).toBeInstanceOf(Date)
		expect(noteRepository.items[0].isFavorite).toBe(false)
		expect(noteRepository.items[0].color.value).toBe('#FFFFFF')
	})

	test('Should return an error if user does not exist.', async () => {
		const note = await useCase.handle({
			title: 'valid_title',
			userId: '1',
			text: 'valid_text'
		})

		expect(note.isLeft()).toBe(true)
	})
})
