import { Module } from '@nestjs/common'
import { HashService } from './hash.service'
import { HashRepository } from '@/domain/user/services/hash-repository'

@Module({
	providers: [{ provide: HashRepository, useClass: HashService }],
	exports: [HashRepository]
})
export class CryptoModule {}
