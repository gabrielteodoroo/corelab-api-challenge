import { User } from '@/domain/user/entities/user'
import { UserRepository } from '@/domain/user/repositories/user-repository'

export class InMemoryUserRepository extends UserRepository {
	items: User[] = []

	async create(user: User) {
		this.items.push(user)
		return user
	}

	async findById(id: string): Promise<User | null> {
		const user = this.items.find(user => user.id.toString() === id)

		if (!user) {
			return null
		}

		return user
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = this.items.find(user => user.email.value === email)

		if (!user) {
			return null
		}

		return user
	}

	async save(user: User): Promise<void> {
		const index = this.items.findIndex(item => item.id === user.id)

		this.items[index] = user
	}
}
