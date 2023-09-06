import { Controller, Post, Body ,UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signUp(@Body() signUpDto: SignUpDto) {
    // Handle user registration logic here
  }

  @Post('signin')
  @UsePipes(new ValidationPipe())
  async signIn(@Body() signInDto: SignInDto) {
    // Handle user login logic here
  }
}
