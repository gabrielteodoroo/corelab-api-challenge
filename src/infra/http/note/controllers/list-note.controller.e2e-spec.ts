import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { DatabaseModule } from '@/infra/database/database.module'
import { AppModule } from '@/app.module'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { hash } from 'bcrypt'
import { randomUUID } from 'crypto'

describe('ListNotesController (e2e)', () => {
	let app: INestApplication
	let prisma: PrismaService
	let jwt: JwtService

	let user: any
	let note: any

	beforeAll(async () => {
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

		note = {
			id: randomUUID(),
			title: 'Note title',
			userId: user.id,
			text: 'Note text',
			color: '#FFFFFF',
			isFavorite: false,
			createdAt: new Date(),
			updatedAt: new Date()
		}

		await prisma.note.create({
			data: note
		})
	})

	test('/notes (GET)', async () => {
		const token = jwt.sign(user)

		const response = await request(app.getHttpServer())
			.get(`/notes`)
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toBe(200)
		expect(response.body).toHaveLength(1)
	})
})
