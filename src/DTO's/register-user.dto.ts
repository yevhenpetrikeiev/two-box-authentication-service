import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';

class RegisterUserDTO {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsStrongPassword({}, { message: 'Password is not strong enough' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, { message: 'Password must be at most 20 characters long' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  // role: 'user' | 'seller' | 'admin' | 'manager' = 'user';
}

export { RegisterUserDTO };
