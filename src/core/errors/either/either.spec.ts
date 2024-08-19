import { Either, left, right } from './either'

const testValue = (value: boolean): Either<string, number> => {
	if (value) {
		return right(123)
	}
	return left('inválido')
}

describe('Either', () => {
	test('Should test a success case.', () => {
		const result = testValue(true)

		expect(result.isLeft()).toBe(false)
		expect(result.isRight()).toBe(true)
	})

	test('should create a Right instance', () => {
		const rightValue = right(10)
		expect(rightValue.isLeft()).toBe(false)
		expect(rightValue.isRight()).toBe(true)
	})

	test('Should test a failure case.', () => {
		const result = testValue(false)

		expect(result.isLeft()).toBe(true)
		expect(result.isRight()).toBe(false)
	})
})
