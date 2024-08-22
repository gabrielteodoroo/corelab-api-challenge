import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { hash } from 'bcrypt'

describe('LoginController (e2e)', () => {
	let app: INestApplication
	let prisma: PrismaService

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule, DatabaseModule]
		}).compile()

		app = moduleFixture.createNestApplication()
		app.useGlobalPipes(new ValidationPipe())
		prisma = moduleFixture.get(PrismaService)

		await app.init()

		await prisma.user.create({
			data: {
				name: 'Gabriel teodoro',
				email: 'gabriel@email.com',
				password: await hash('gabriel123', 10)
			}
		})
	})

	test('/login (POST)', async () => {
		const response = await request(app.getHttpServer())
			.post('/login')
			.send({
				email: 'gabriel@email.com',
				password: 'gabriel123'
			})

		expect(response.statusCode).toBe(200)
	})
})
