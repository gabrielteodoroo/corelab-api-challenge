import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('CreateUserController', () => {
	let app: INestApplication

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule, DatabaseModule]
		}).compile()

		app = moduleFixture.createNestApplication()
		app.useGlobalPipes(new ValidationPipe())

		await app.init()
	})

	test('/user (POST)', async () => {
		const response = await request(app.getHttpServer()).post('/user').send({
			name: 'Gabriel teodoro',
			email: 'gabriel@email.com',
			password: 'gabriel123'
		})

		expect(response.statusCode).toBe(201)
		expect(response.body).toHaveProperty('id')
		expect(response.body).toHaveProperty('name', 'Gabriel teodoro')
		expect(response.body).toHaveProperty('email', 'gabriel@email.com')
	})
})
