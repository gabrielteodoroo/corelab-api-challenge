import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@/app.module'
import { hash } from 'bcrypt'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { DatabaseModule } from '@/infra/database/database.module'
import { JwtService } from '@nestjs/jwt'
import { randomUUID } from 'crypto'

describe('DeleteUserController', () => {
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
			name: 'estefane',
			email: 'estefane@email.com',
			password: await hash('estefane123', 10)
		}

		await prisma.user.create({
			data: user
		})
	})

	test('/users/:id (DELETE)', async () => {
		const token = jwt.sign(user)

		const id = randomUUID()

		await prisma.user.create({
			data: {
				id,
				name: 'user',
				email: 'user@email.com',
				password: '12345'
			}
		})

		const response = await request(app.getHttpServer())
			.delete(`/users/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toBe(204)
	})
})
