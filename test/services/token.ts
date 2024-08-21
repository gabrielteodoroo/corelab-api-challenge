import { TokenRepository } from '@/domain/user/services/token-repository'

export class TokenSimulator implements TokenRepository {
	generate(value: Record<string, unknown>): string {
		return JSON.stringify(value)
	}
}
