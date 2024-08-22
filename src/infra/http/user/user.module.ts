import { UserRepository } from '@/domain/user/repositories/user-repository'
import { HashRepository } from '@/domain/user/services/hash-repository'
import { CreateUserUseCase } from '@/domain/user/use-cases/create-user'
import { CryptoModule } from '@/infra/crypto/crypto.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { CreateUserController } from './controllers/create-employee.controller'

@Module({
	imports: [DatabaseModule, CryptoModule],
	providers: [
		{
			provide: CreateUserUseCase,
			useFactory: (
				userRepository: UserRepository,
				hashRepository: HashRepository
			) => {
				return new CreateUserUseCase(userRepository, hashRepository)
			},
			inject: [UserRepository, HashRepository]
		}
	],
	controllers: [CreateUserController]
})
export class UserModule {}
