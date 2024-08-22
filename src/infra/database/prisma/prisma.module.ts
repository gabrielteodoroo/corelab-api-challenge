import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { UserRepository } from '@/domain/user/repositories/user-repository'
import { UserPrismaRepository } from './repositories/user-prisma-repository'
import { NoteRepository } from '@/domain/user/repositories/note-repository'
import { NotePrismaRepository } from './repositories/note-prisma-repository'

@Module({
	providers: [
		PrismaService,
		{ provide: UserRepository, useClass: UserPrismaRepository },
		{ provide: NoteRepository, useClass: NotePrismaRepository }
	],
	exports: [PrismaService, UserRepository, NoteRepository]
})
export class PrismaModule {}
