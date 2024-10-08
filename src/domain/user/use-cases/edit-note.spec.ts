import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository'
import Email from '@/domain/shared/email'
import { User } from '../entities/user'
import { EditNoteUseCase } from './edit-note'
import { InMemoryNoteRepository } from '../../../../test/repositories/in-memory-note-repository'
import { Identity } from '@/core/entities/identity'
import { Note } from '../entities/note'
import Color from '@/domain/shared/color'

let useCase: EditNoteUseCase
let userRepository: InMemoryUserRepository
let noteRepository: InMemoryNoteRepository

describe('EditNoteUseCase', () => {
	beforeEach(async () => {
		noteRepository = new InMemoryNoteRepository()
		userRepository = new InMemoryUserRepository()
		useCase = new EditNoteUseCase(noteRepository)
	})

	test('should edit a note', async () => {
		const user = User.create(
			{
				name: 'valid_name',
				email: Email.create('valid_email@email.com'),
				password: 'valid_password'
			},
			new Identity('user_id')
		)

		userRepository.items.push(user)

		const note = Note.create({
			title: 'title',
			color: Color.create('#000000'),
			isFavorite: false,
			text: 'text',
			userId: user.id.toString()
		})

		noteRepository.items.push(note)

		const response = await useCase.handle({
			id: note.id.toString(),
			userId: user.id.toString(),
			title: 'new_title',
			color: '#ff0c0c',
			isFavorite: true,
			text: 'new_text'
		})

		expect(response.isRight()).toBe(true)
		expect(noteRepository.items[0].userId).toBe(user.id.toString())
		expect(noteRepository.items[0].color.value).toBe('#ff0c0c')
		expect(noteRepository.items[0].title).toBe('new_title')
		expect(noteRepository.items[0].isFavorite).toBe(true)
		expect(noteRepository.items[0].text).toBe('new_text')
		expect(noteRepository.items[0].updatedAt).not.toBe(
			noteRepository.items[0].createdAt
		)
	})

	test('should not edit a note if the note does not exist', async () => {
		const response = await useCase.handle({
			id: 'invalid_id',
			userId: 'user_id',
			title: 'title',
			color: '#000000',
			isFavorite: false,
			text: 'text'
		})

		expect(response.isLeft()).toBe(true)
	})

	test('should not edit a note if the user does not exist', async () => {
		const note = Note.create({
			title: 'title',
			color: Color.create('#000000'),
			isFavorite: false,
			text: 'text',
			userId: 'user_id'
		})

		noteRepository.items.push(note)

		const response = await useCase.handle({
			id: note.id.toString(),
			userId: 'invalid_user_id',
			title: 'new_title',
			color: '#ff0c0c',
			isFavorite: true,
			text: 'new_text'
		})

		expect(response.isLeft()).toBe(true)
	})

	test('should not edit a note if the color is invalid', async () => {
		const user = User.create(
			{
				name: 'valid_name',
				email: Email.create('valid_email@email.com'),
				password: 'valid_password'
			},
			new Identity('user_id')
		)

		userRepository.items.push(user)

		const note = Note.create({
			title: 'title',
			color: Color.create('#000000'),
			isFavorite: false,
			text: 'text',
			userId: user.id.toString()
		})

		noteRepository.items.push(note)

		const response = await useCase.handle({
			id: note.id.toString(),
			userId: user.id.toString(),
			title: 'new_title',
			color: '111',
			isFavorite: true,
			text: 'new_text'
		})

		expect(response.isLeft()).toBe(true)
	})
})
