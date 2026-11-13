import { Body, Controller, Delete, Post } from '@nestjs/common';
import { RegisterUserDTO } from "../DTO's/register-user.dto.js";
import { LoginUserDTO } from "../DTO's/login-user.dto.js";
import { AuthService } from './auth.service.js';
import { DeleteUserDTO } from "../DTO's/delete-user.dto.js";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() userData: RegisterUserDTO,
  ): Promise<{ message: string }> {
    const { email, password } = userData;
    await this.authService.signUp(email, password);
    return { message: 'User created successfully' };
  }

  @Post('/signin')
  async signIn(@Body() userData: LoginUserDTO): Promise<{ message: string }> {
    const { email, password } = userData;
    const isSignedIn = await this.authService.signIn(email, password);
    if (!isSignedIn) {
      throw new Error('Invalid email or password');
    }
    return { message: 'User signed in successfully' };
  }

  @Delete('/delete')
  async deleteUser(
    @Body() userData: DeleteUserDTO,
  ): Promise<{ message: string }> {
    const { email, password } = userData;
    await this.authService.deleteUser(email, password);
    return { message: 'User deleted successfully' };
  }
}
