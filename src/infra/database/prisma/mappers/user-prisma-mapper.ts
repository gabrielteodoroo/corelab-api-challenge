import { Identity } from '@/core/entities/identity'
import Email from '@/domain/shared/email'
import { User } from '@/domain/user/entities/user'
import { User as UserDatabase } from '@prisma/client'

export class UserPrismaMapper {
	static toDomain(user: UserDatabase): User {
		return User.create(
			{
				name: user.name,
				email: Email.create(user.email),
				password: user.password,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt
			},
			new Identity(user.id)
		)
	}

	static toPersistence(user: User): UserDatabase {
		return {
			id: user.id.toString(),
			name: user.name,
			email: user.email.value,
			password: user.password,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt
		}
	}
}
