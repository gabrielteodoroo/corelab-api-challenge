import { User } from '../entities/user'

export abstract class UserRepository {
	abstract findByEmail(email: string): Promise<User | null>
	abstract create(user: User): Promise<User>
	abstract findById(id: string): Promise<User | null>
	abstract save(user: User): Promise<void>
}
