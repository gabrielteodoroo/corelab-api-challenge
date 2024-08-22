import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { validate } from './env.validation'
import { HttpModule } from './infra/http/http.module'
import { AuthModule } from './infra/auth/auth.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validate
		}),
		HttpModule,
		AuthModule
	]
})
export class AppModule {}
