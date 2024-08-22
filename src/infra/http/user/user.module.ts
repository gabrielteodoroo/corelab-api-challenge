import { UserRepository } from '@/domain/user/repositories/user-repository'
import { HashRepository } from '@/domain/user/services/hash-repository'
import { CreateUserUseCase } from '@/domain/user/use-cases/create-user'
import { CryptoModule } from '@/infra/crypto/crypto.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { CreateUserController } from './controllers/create-user.controller'
import { AuthUserUseCase } from '@/domain/user/use-cases/auth-user'
import { TokenRepository } from '@/domain/user/services/token-repository'
import { LoginController } from './controllers/login-controller'
import { ListUserUserCase } from '@/domain/user/use-cases/list-users'
import { ListUsersController } from './controllers/list-users.controller'
import { GetUserUserCase } from '@/domain/user/use-cases/get-user'
import { GetUserController } from './controllers/get-user.controller'
import { EditUserUseCase } from '@/domain/user/use-cases/edit-user'
import { EditUserController } from './controllers/edit-user.controller'
import { DeleteUserUseCase } from '@/domain/user/use-cases/delete-user'
import { DeleteUserController } from './controllers/delete-user.controller'

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
		},
		{
			provide: AuthUserUseCase,
			useFactory: (
				userRepository: UserRepository,
				hashRepository: HashRepository,
				tokenRepository: TokenRepository
			) => {
				return new AuthUserUseCase(
					userRepository,
					hashRepository,
					tokenRepository
				)
			},
			inject: [UserRepository, HashRepository, TokenRepository]
		},
		{
			provide: ListUserUserCase,
			useFactory: (userRepository: UserRepository) => {
				return new ListUserUserCase(userRepository)
			},
			inject: [UserRepository]
		},
		{
			provide: GetUserUserCase,
			useFactory: (userRepository: UserRepository) => {
				return new GetUserUserCase(userRepository)
			},
			inject: [UserRepository]
		},
		{
			provide: EditUserUseCase,
			useFactory: (
				userRepository: UserRepository,
				hashRepository: HashRepository
			) => {
				return new EditUserUseCase(userRepository, hashRepository)
			},
			inject: [UserRepository, HashRepository]
		},
		{
			provide: DeleteUserUseCase,
			useFactory: (userRepository: UserRepository) => {
				return new DeleteUserUseCase(userRepository)
			},
			inject: [UserRepository]
		}
	],
	controllers: [
		CreateUserController,
		LoginController,
		ListUsersController,
		GetUserController,
		EditUserController,
		DeleteUserController
	]
})
export class UserModule {}
