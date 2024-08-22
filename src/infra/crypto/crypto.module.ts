import { Module } from '@nestjs/common'
import { HashService } from './hash.service'
import { HashRepository } from '@/domain/user/services/hash-repository'
import { TokenRepository } from '@/domain/user/services/token-repository'
import { JwtToken } from './jwt.service'

@Module({
	providers: [
		{ provide: HashRepository, useClass: HashService },
		{ provide: TokenRepository, useClass: JwtToken }
	],

	exports: [HashRepository, TokenRepository]
})
export class CryptoModule {}
