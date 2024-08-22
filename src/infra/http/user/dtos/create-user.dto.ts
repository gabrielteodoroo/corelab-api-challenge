import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDTO {
	@IsNotEmpty({ message: 'Name is required' })
	name: string

	@IsNotEmpty({ message: 'Email is required' })
	@IsEmail({}, { message: 'Email must be a valid email' })
	email: string

	@IsNotEmpty({ message: 'Password is required' })
	password: string
}
