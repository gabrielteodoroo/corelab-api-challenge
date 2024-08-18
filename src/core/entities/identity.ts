import { randomUUID } from 'crypto'

export class Identity {
	private value: string

	toString() {
		return this.value
	}

	constructor(value?: string) {
		this.value = value ?? randomUUID()
	}
}
