import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository'
import Email from '@/domain/shared/email'
import { User } from '../entities/user'
import { InMemoryNoteRepository } from '../../../../test/repositories/in-memory-note-repository'
import { Note } from '../entities/note'
import { ToggleFavoriteNoteUseCase } from './toggleFavorite-note'

let useCase: ToggleFavoriteNoteUseCase
let userRepository: InMemoryUserRepository
let noteRepository: InMemoryNoteRepository

describe('ToggleFavoriteNoteUseCase', () => {
	beforeEach(async () => {
		noteRepository = new InMemoryNoteRepository()
		userRepository = new InMemoryUserRepository()
		useCase = new ToggleFavoriteNoteUseCase(noteRepository, userRepository)
	})

	test('should favorite a note', async () => {
		const user = User.create({
			name: 'valid_name',
			email: Email.create('valid_email@email.com'),
			password: 'valid_password'
		})

		userRepository.items.push(user)

		const note = Note.create({
			title: 'title',
			userId: user.id.toString()
		})

		noteRepository.items.push(note)

		expect(note.isFavorite).toBe(false)

		const response = await useCase.execute({
			id: note.id.toString(),
			userId: user.id.toString()
		})

		expect(response.isRight()).toBe(true)
		expect(noteRepository.items[0].isFavorite).toBe(true)
	})

	test('should not favorite a note if note does not exist', async () => {
		const user = User.create({
			name: 'valid_name',
			email: Email.create('valid_email@email.com'),
			password: 'valid_password'
		})

		userRepository.items.push(user)

		const response = await useCase.execute({
			id: 'invalid_id',
			userId: user.id.toString()
		})

		expect(response.isLeft()).toBe(true)
	})

	test('should not favorite a note if user does not exist', async () => {
		const note = Note.create({
			title: 'title',
			userId: 'invalid_id'
		})

		noteRepository.items.push(note)

		const response = await useCase.execute({
			id: note.id.toString(),
			userId: 'invalid_id'
		})

		expect(response.isLeft()).toBe(true)
	})

	test('should not favorite a note if user does not own the note', async () => {
		const user = User.create({
			name: 'valid_name',
			email: Email.create('valid_email@email.com'),
			password: 'valid_password'
		})

		userRepository.items.push(user)

		const note = Note.create({
			title: 'title',
			userId: 'another_user_id'
		})

		noteRepository.items.push(note)

		const response = await useCase.execute({
			id: note.id.toString(),
			userId: user.id.toString()
		})

		expect(response.isLeft()).toBe(true)
	})
})
