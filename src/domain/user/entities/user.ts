import { Entity } from '@/core/entities/entity'
import { Identity } from '@/core/entities/identity'

type UserType = {
	id: string
	email: string
	name: string
	password: string
}

export class User extends Entity<UserType> {
	constructor(data: UserType, id?: Identity) {
		super(data, id)
	}

	get email(): string {
		return this.attributes.email
	}

	get name(): string {
		return this.attributes.name
	}

	get password(): string {
		return this.attributes.password
	}

	set email(email: string) {
		this.attributes.email = email
	}

	set name(name: string) {
		this.attributes.name = name
	}

	set password(password: string) {
		this.attributes.password = password
	}
}
