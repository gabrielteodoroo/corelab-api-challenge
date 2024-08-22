import { HashRepository } from '@/domain/user/services/hash-repository'
import { compare, hash } from 'bcrypt'

export class HashService implements HashRepository {
	async hash(value: string): Promise<string> {
		return await hash(value, 10)
	}

	async compare(value: string, hash: string): Promise<boolean> {
		return await compare(value, hash)
	}
}
