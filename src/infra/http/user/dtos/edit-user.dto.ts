import { PartialType } from '@nestjs/swagger'
import { CreateUserDTO } from './create-user.dto'

export class EditUserDTO extends PartialType(CreateUserDTO) {}
