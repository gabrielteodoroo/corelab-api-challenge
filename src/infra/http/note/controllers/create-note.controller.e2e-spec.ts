import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { randomUUID } from 'crypto'
import { hash } from 'bcrypt'

describe('CreateNoteController', () => {
	let app: INestApplication
	let prisma: PrismaService
	let jwt: JwtService

	let user: any

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule, DatabaseModule]
		}).compile()

		app = moduleFixture.createNestApplication()
		app.useGlobalPipes(new ValidationPipe())
		prisma = moduleFixture.get(PrismaService)
		jwt = moduleFixture.get(JwtService)

		await app.init()

		user = {
			id: randomUUID(),
			name: 'Gabriel teodoro',
			email: 'gabriel@email.com',
			password: await hash('gabriel123', 10)
		}

		await prisma.user.create({
			data: user
		})
	})

	test('/notes (POST)', async () => {
		const token = jwt.sign(user)

		const response = await request(app.getHttpServer())
			.post('/notes')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Note title',
				userId: user.id,
				text: 'Note text'
			})

		expect(response.statusCode).toBe(201)
	})
})
