import { NoteRepository } from '@/domain/user/repositories/note-repository'
import { UserRepository } from '@/domain/user/repositories/user-repository'
import { CreateNoteUseCase } from '@/domain/user/use-cases/create-note'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { CreateNoteController } from './controllers/create-note.controller'
import { ListNotesUserCase } from '@/domain/user/use-cases/list-notes'
import { ListNotesController } from './controllers/list-notes.controller'

@Module({
	imports: [DatabaseModule],
	providers: [
		{
			provide: CreateNoteUseCase,
			useFactory: (
				noteRepository: NoteRepository,
				userRepository: UserRepository
			) => {
				return new CreateNoteUseCase(noteRepository, userRepository)
			},
			inject: [NoteRepository, UserRepository]
		},
		{
			provide: ListNotesUserCase,
			useFactory: (noteRepository: NoteRepository) => {
				return new ListNotesUserCase(noteRepository)
			},
			inject: [NoteRepository]
		}
	],
	controllers: [CreateNoteController, ListNotesController]
})
export class NoteModule {}
