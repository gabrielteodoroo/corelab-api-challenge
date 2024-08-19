import { Entity } from '@/core/entities/entity'
import { Identity } from '@/core/entities/identity'
import { Optional } from '@/core/types/optional'
import Email from '@/domain/shared/email'

type UserType = {
	email: Email
	name: string
	password: string
	createdAt?: Date
	updatedAt?: Date
}

export class User extends Entity<UserType> {
	static create(
		data: Optional<UserType, 'createdAt' | 'updatedAt'>,
		id?: Identity
	) {
		return new User({ ...data }, id)
	}

	get email() {
		return this.attributes.email
	}

	get name() {
		return this.attributes.name
	}

	get password() {
		return this.attributes.password
	}

	get createdAt() {
		return this.attributes.createdAt
	}

	get updatedAt() {
		return this.attributes.updatedAt
	}

	set email(email: Email) {
		this.attributes.email = email
	}

	set name(name: string) {
		this.attributes.name = name
	}

	set password(password: string) {
		this.attributes.password = password
	}

	set updatedAt(updatedAt: Date) {
		this.attributes.updatedAt = updatedAt
	}
}
