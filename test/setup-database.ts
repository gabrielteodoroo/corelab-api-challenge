import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()
const schema = randomUUID()

beforeAll(async () => {
	if (!process.env.DATABASE_URL) {
		throw new Error('env DATABASE_URL not set')
	}

	const url = new URL(process.env.DATABASE_URL)
	url.searchParams.set('schema', schema)

	process.env.DATABASE_URL = url.toString()

	execSync('prisma migrate deploy', {
		env: {
			...process.env,
			DATABASE_URL: url.toString()
		}
	})
})

afterAll(async () => {
	await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
	await prisma.$disconnect()
})
