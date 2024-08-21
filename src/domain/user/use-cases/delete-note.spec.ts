import { User } from '../entities/user'
import Email from '@/domain/shared/email'
import { Identity } from '@/core/entities/identity'
import { InMemoryNoteRepository } from '../../../../test/repositories/in-memory-note-repository'
import { DeleteNoteUseCase } from './delete-note'
import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository'
import { Note } from '../entities/note'

let noteRepository: InMemoryNoteRepository
let userRepository: InMemoryUserRepository
let useCase: DeleteNoteUseCase

describe('DeleteNoteUseCase', () => {
	beforeEach(() => {
		noteRepository = new InMemoryNoteRepository()
		userRepository = new InMemoryUserRepository()
		useCase = new DeleteNoteUseCase(noteRepository, userRepository)

		const user = User.create(
			{
				name: 'valid_name',
				email: Email.create('valid_email@email.com'),
				password: 'valid_password'
			},
			new Identity('valid_id')
		)

		userRepository.items.push(user)

		const note = Note.create({
			title: 'title',
			userId: user.id.toString()
		})

		noteRepository.items.push(note)
	})

	test('should delete a note', async () => {
		expect(noteRepository.items).toHaveLength(1)

		const response = await useCase.handle({
			noteId: noteRepository.items[0].id.toString(),
			userId: userRepository.items[0].id.toString()
		})

		expect(response.isRight()).toBe(true)
		expect(noteRepository.items).toHaveLength(0)
	})

	test('should return a NotFoundError if the note does not exist', async () => {
		const response = await useCase.handle({
			noteId: 'invalid_id',
			userId: userRepository.items[0].id.toString()
		})

		expect(response.isLeft()).toBe(true)
		expect(response.value).toBeInstanceOf(Error)
	})
})
