export default class Email {
	private constructor(readonly value: string) {
		this.value = value
	}

	static create(email: string): Email {
		return new Email(email)
	}

	validate() {
		return !!this.value
			.toLowerCase()
			.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
	}
}
