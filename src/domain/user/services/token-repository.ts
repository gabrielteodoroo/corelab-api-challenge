export abstract class TokenRepository {
	abstract generate(value: Record<string, unknown>): string
}
