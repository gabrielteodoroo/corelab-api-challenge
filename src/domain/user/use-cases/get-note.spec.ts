import { User } from '../entities/user'
import Email from '@/domain/shared/email'
import { GetNoteUserCase } from './get-note'
import { InMemoryNoteRepository } from '../../../../test/repositories/in-memory-note-repository'
import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository'
import { Note } from '../entities/note'
import { Identity } from '@/core/entities/identity'

let noteRepository: InMemoryNoteRepository
let userRepository: InMemoryUserRepository
let useCase: GetNoteUserCase

describe('GetNoteUseCase', () => {
	beforeEach(() => {
		noteRepository = new InMemoryNoteRepository()
		userRepository = new InMemoryUserRepository()
		useCase = new GetNoteUserCase(noteRepository)
	})

	test('should return a note', async () => {
		const user = User.create(
			{
				name: 'valid_name',
				email: Email.create('valid_email@email.com'),
				password: 'valid_password'
			},
			new Identity('user_id')
		)

		userRepository.items.push(user)

		const note = Note.create(
			{
				title: 'valid_title',
				userId: 'user_id'
			},
			new Identity('note_id')
		)

		noteRepository.items.push(note)

		const response = await useCase.handle({
			id: 'note_id',
			userId: 'user_id'
		})

		expect(noteRepository.items[0]).toEqual(response.value)
		expect(response.isRight()).toBe(true)
	})

	test('should return null if the note does not exist', async () => {
		const response = await useCase.handle({
			id: 'invalid_id',
			userId: 'user_id'
		})

		expect(response.isLeft()).toBe(true)
	})
})
