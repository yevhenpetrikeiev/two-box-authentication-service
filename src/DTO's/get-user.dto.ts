import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';

class GetUserByEmailDTO {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}

export { GetUserByEmailDTO };
