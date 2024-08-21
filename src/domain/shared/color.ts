export default class Color {
	private constructor(readonly value: string) {
		this.value = value
	}

	static create(color: string): Color {
		return new Color(color)
	}

	validate() {
		return !!this.value
			.toLowerCase()
			.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
	}
}
