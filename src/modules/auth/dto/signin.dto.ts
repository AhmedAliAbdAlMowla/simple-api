import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Length
} from 'class-validator';
export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(6)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  password: string;

  
}
