import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

class DeleteUserDTO {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, { message: 'Password must be at most 20 characters long' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}

export { DeleteUserDTO };
