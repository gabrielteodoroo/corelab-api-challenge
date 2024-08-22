import { User } from '../entities/user'
import Email from '@/domain/shared/email'
import { InMemoryNoteRepository } from '../../../../test/repositories/in-memory-note-repository'
import { ListNotesUserCase } from './list-notes'
import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository'
import { Note } from '../entities/note'

let noteRepository: InMemoryNoteRepository
let userRepository: InMemoryUserRepository
let useCase: ListNotesUserCase

describe('ListNotesUseCase', () => {
	beforeEach(() => {
		noteRepository = new InMemoryNoteRepository()
		userRepository = new InMemoryUserRepository()
		useCase = new ListNotesUserCase(noteRepository)
	})

	test('should list all notes', async () => {
		const user = User.create({
			name: 'valid_name',
			email: Email.create('valid_email@email.com'),
			password: 'valid_password'
		})

		userRepository.items.push(user)

		const note = Note.create({
			title: 'valid_title',
			userId: user.id.toString()
		})

		noteRepository.items.push(note)

		const response = await useCase.handle({ userId: user.id.toString() })

		expect(response.isRight()).toBe(true)
		expect(response.value).toHaveLength(1)
	})

	test('should return an empty array if there are no notes for the user', async () => {
		const user = User.create({
			name: 'valid_name',
			email: Email.create('valid_email@email.com'),
			password: 'valid_password'
		})

		userRepository.items.push(user)

		const note = Note.create({
			title: 'valid_title',
			userId: user.id.toString()
		})

		noteRepository.items.push(note)

		const response = await useCase.handle({ userId: '1' })

		expect(response.isRight()).toBe(true)
		expect(response.value).toHaveLength(0)
	})
})
