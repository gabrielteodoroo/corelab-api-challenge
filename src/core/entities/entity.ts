import { Identity } from './identity'

export abstract class Entity<T> {
	private entityId: Identity
	protected attributes: T

	get id() {
		return this.entityId
	}

	protected constructor(attributes: T, id?: Identity) {
		this.entityId = id ?? new Identity()
		this.attributes = attributes
	}
}
