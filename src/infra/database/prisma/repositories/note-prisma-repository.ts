import { NoteRepository } from '@/domain/user/repositories/note-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Note } from '@/domain/user/entities/note'
import { NotePrismaMapper } from '../mappers/note-prisma-mapper'

@Injectable()
export class NotePrismaRepository implements NoteRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async create(user: Note): Promise<Note> {
		const data = NotePrismaMapper.toPersistence(user)

		const createdUser = await this.prismaService.note.create({ data })

		return NotePrismaMapper.toDomain(createdUser)
	}

	async findMany(userId): Promise<Note[]> {
		const data = await this.prismaService.note.findMany({
			where: { userId }
		})

		return data.map(NotePrismaMapper.toDomain)
	}

	async findById({
		id,
		userId
	}: {
		id: string
		userId: string
	}): Promise<Note | null> {
		const note = await this.prismaService.note.findFirst({
			where: { id, userId }
		})

		if (!note) return null

		return NotePrismaMapper.toDomain(note)
	}

	async save(note: Note): Promise<void> {
		const data = NotePrismaMapper.toPersistence(note)

		await this.prismaService.note.update({
			where: { id: data.id },
			data
		})
	}

	async delete(id: string): Promise<void> {
		await this.prismaService.note.delete({ where: { id } })
	}

	async toggleNoteFavorite(note: Note): Promise<void> {
		const data = NotePrismaMapper.toPersistence(note)

		await this.prismaService.note.update({
			where: { id: note.id.toString() },
			data
		})
	}
}
