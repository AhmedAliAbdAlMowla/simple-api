import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Length,
  Matches,
} from 'class-validator';
export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(2)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(2)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(6)
  email: string;

  @IsString({ message: 'Password must be a string' })
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
  @Matches(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
    message: 'Password must have characters and at least 1 number',
  })
  password: string;
}
