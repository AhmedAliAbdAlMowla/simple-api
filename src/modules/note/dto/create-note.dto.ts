import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateNoteDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    @MinLength(3)
    title: string
  

    @IsString()
    @IsNotEmpty()
    @MaxLength(800)
    @MinLength(3)
    excerpt: string

    account: string;

}
