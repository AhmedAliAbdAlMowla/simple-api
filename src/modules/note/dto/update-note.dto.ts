import { IsNotEmpty, IsOptional, IsString, MinLength, MaxLength  } from 'class-validator';

export class UpdateNoteDto  {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @MaxLength(150)
    @MinLength(3)
    title: string


    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @MaxLength(800)
    @MinLength(3)
    excerpt?: string

  
  
}
