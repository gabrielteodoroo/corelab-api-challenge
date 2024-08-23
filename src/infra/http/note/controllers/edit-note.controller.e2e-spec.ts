import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@/app.module'
import { hash } from 'bcrypt'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { DatabaseModule } from '@/infra/database/database.module'
import { JwtService } from '@nestjs/jwt'
import { randomUUID } from 'crypto'

describe('EditNoteController (e2e)', () => {
	let app: INestApplication
	let prisma: PrismaService
	let jwt: JwtService

	let user: any
	let note: any

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
			name: 'estefane',
			email: 'estefane@email.com',
			password: await hash('estefane123', 10)
		}

		await prisma.user.create({
			data: user
		})

		note = {
			id: randomUUID(),
			title: 'Note title',
			text: 'Note text updated',
			userId: user.id,
			color: '#ffffff',
			createdAt: new Date(),
			updatedAt: new Date(),
			isFavorite: false
		}

		await prisma.note.create({
			data: note
		})
	})

	test('/notes/:id (PUT)', async () => {
		const token = jwt.sign(user)

		const response = await request(app.getHttpServer())
			.put(`/notes/${note.id}`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Note title updated',
				text: 'Note text updated',
				color: '#ffffff',
				isFavorite: false,
				userId: user.id
			})

		const responseGet = await request(app.getHttpServer())
			.get(`/notes/${note.id}`)
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toBe(204)
		expect(responseGet.body.title).toBe('Note title updated')
		expect(responseGet.body.text).toBe('Note text updated')
	})
})
