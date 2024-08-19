import { HashRepository } from '@/domain/user/services/hash-repository'

export class HashSimulator implements HashRepository {
	async hash(value: string): Promise<string> {
		return value.concat('hashed')
	}

	async compare(value: string, hash: string): Promise<boolean> {
		return value.concat('hashed') === hash
	}
}
