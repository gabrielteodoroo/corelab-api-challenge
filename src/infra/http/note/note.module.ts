import { NoteRepository } from '@/domain/user/repositories/note-repository'
import { UserRepository } from '@/domain/user/repositories/user-repository'
import { CreateNoteUseCase } from '@/domain/user/use-cases/create-note'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { CreateNoteController } from './controllers/create-note.controller'
import { ListNotesUserCase } from '@/domain/user/use-cases/list-notes'
import { ListNotesController } from './controllers/list-notes.controller'
import { GetNoteUserCase } from '@/domain/user/use-cases/get-note'
import { GetNoteController } from './controllers/get-note.controller'
import { EditNoteUseCase } from '@/domain/user/use-cases/edit-note'
import { EditNoteController } from './controllers/edit-note.controller'
import { DeleteNoteUseCase } from '@/domain/user/use-cases/delete-note'
import { DeleteNoteController } from './controllers/delete-note.controller'

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
		},
		{
			provide: GetNoteUserCase,
			useFactory: (noteRepository: NoteRepository) => {
				return new GetNoteUserCase(noteRepository)
			},
			inject: [NoteRepository]
		},
		{
			provide: EditNoteUseCase,
			useFactory: (noteRepository: NoteRepository) => {
				return new EditNoteUseCase(noteRepository)
			},
			inject: [NoteRepository]
		},
		{
			provide: DeleteNoteUseCase,
			useFactory: (noteRepository: NoteRepository) => {
				return new DeleteNoteUseCase(noteRepository)
			},
			inject: [NoteRepository]
		}
	],
	controllers: [
		CreateNoteController,
		ListNotesController,
		GetNoteController,
		EditNoteController,
		DeleteNoteController
	]
})
export class NoteModule {}
