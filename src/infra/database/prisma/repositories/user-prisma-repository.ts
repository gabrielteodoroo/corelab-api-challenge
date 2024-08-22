import { User } from '@/domain/user/entities/user'
import { UserRepository } from '@/domain/user/repositories/user-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UserPrismaMapper } from '../mappers/user-prisma-mapper'

@Injectable()
export class UserPrismaRepository implements UserRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async create(user: User): Promise<User> {
		const data = UserPrismaMapper.toPersistence(user)

		const createdUser = await this.prismaService.user.create({ data })

		return UserPrismaMapper.toDomain(createdUser)
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.prismaService.user.findFirst({
			where: { email }
		})

		if (!user) return null

		return UserPrismaMapper.toDomain(user)
	}

	async findById(id: string): Promise<User | null> {
		const user = await this.prismaService.user.findFirst({ where: { id } })

		if (!user) return null

		return UserPrismaMapper.toDomain(user)
	}

	async save(user: User): Promise<void> {
		const data = UserPrismaMapper.toPersistence(user)

		await this.prismaService.user.update({
			where: { id: data.id },
			data
		})
	}

	async findMany(): Promise<User[]> {
		const users = await this.prismaService.user.findMany()

		return users.map(UserPrismaMapper.toDomain)
	}

	async delete(id: string): Promise<void> {
		await this.prismaService.user.delete({ where: { id } })
	}
}
