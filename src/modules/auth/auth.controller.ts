import { Controller, Post, Body, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountService } from '../account/account.service';
import { SignUpDto, SignInDto, RefreshTokenDto } from './dto';
import { JWTService } from './jwt.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
    private readonly jwtService: JWTService,
  ) {}
  
  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signUp(@Body() signUpDto: SignUpDto) {
    const { email } = signUpDto;
  
    // Check if an account with the given email already exists
    const existingAccount = await this.accountService.findOneByEmail(email);
  
    if (existingAccount) {
      // An account with this email already exists
      throw new HttpException(
        'An account with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    signUpDto.password = await this.authService.hashPassword(
      signUpDto.password,
    );
  
    const account = await this.accountService.create(signUpDto);
  
    if (!account) {
      // Something went wrong
      throw new HttpException(
        'Cannot create account.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  
    return {
      message: 'Account created successfully',
      payload: {},
    };
  }
  



  @Post('signin')
  @UsePipes(new ValidationPipe())
  async signIn(@Body() signInDto: SignInDto) {
    const { email } = signInDto;
  
    // Check if an account with the given email exists
    const existingAccount = await this.accountService.findOneByEmail(email);
  
    if (!existingAccount) {
      // An account with this email does not exist
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    const validPassword = await this.authService.comparePasswords(
      signInDto.password,
      existingAccount.password,
    );
  
    if (!validPassword) {
      // Invalid password
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    const accessToken = await this.jwtService.signAccessToken({
      id: existingAccount.id,
      name: `${existingAccount.firstName} ${existingAccount.lastName}`,
      email: existingAccount.email,
      role: existingAccount.role,
    });
  
    const refreshToken = await this.jwtService.signRefreshToken({
      id: existingAccount.id,
      name: `${existingAccount.firstName} ${existingAccount.lastName}`,
      email: existingAccount.email,
      role: existingAccount.role,
    });
  
    return {
      message: "Success SignIn",
      payload: {
        id: existingAccount.id,
        firstName: existingAccount.firstName,
        lastName: existingAccount.lastName,
        email: existingAccount.email,
        role: existingAccount.role,
        profileImageLink: existingAccount.profileImageLink,
        country: existingAccount.country,
        city: existingAccount.city,
        bio: existingAccount.bio,
        createdAt: existingAccount.createdAt,
        accessToken,
        refreshToken,
      },
    };
  }
  


@Post('refresh-token')
@UsePipes(new ValidationPipe())
async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
  const validRefreshToken = await this.jwtService.verifyRefreshToken(refreshTokenDto.refreshToken);

  if (!validRefreshToken) {
    throw new HttpException('Expired token.', HttpStatus.BAD_REQUEST);
  }

  const { email } = validRefreshToken;

  // Check if an account with the given email exists
  const existingAccount = await this.accountService.findOneByEmail(email);

  if (!existingAccount) {
    // An account with this email does not exist
    throw new HttpException('Account not found.', HttpStatus.BAD_REQUEST);
  }

  const accessToken = await this.jwtService.signAccessToken({
    id: existingAccount.id,
    name: `${existingAccount.firstName} ${existingAccount.lastName}`,
    email: existingAccount.email,
    role: existingAccount.role,
  });

  const refreshToken = await this.jwtService.signRefreshToken({
    id: existingAccount.id,
    name: `${existingAccount.firstName} ${existingAccount.lastName}`,
    email: existingAccount.email,
    role: existingAccount.role,
  });

  return {
    message: "Tokens created successfully",
    payload: {
      accessToken,
      refreshToken,
    },
  };
}


}

