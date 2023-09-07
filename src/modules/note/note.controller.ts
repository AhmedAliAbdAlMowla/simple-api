import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthGuard } from '../auth/guard/auth.guard';



// Augment the Request type to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: any; 
    }
  }
}

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(@Req() request: Request, @Body() createNoteDto: CreateNoteDto) {
    createNoteDto.account = request.user.id;
    const note = await this.noteService.create(createNoteDto);

    return {
      message: 'Note created successfully.',
      payload: note,
    };
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(
    @Req() request: Request,
    @Query('pageNumber') pageNumber: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    const notes = await this.noteService.paginateNotes(pageNumber, pageSize, request.user.id);

    return {
      message: 'Notes retrieved successfully.',
      payload: notes,
    };
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Req() request: Request, @Param('id') id: string) {
    const note = await this.noteService.findOne(Number(id), Number(request.user.id));
    if (!note) {
      throw new HttpException(
        'No valid entry found for provided ID.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      message: 'Note retrieved successfully.',
      payload: note,
    };
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async update(@Req() request: Request, @Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    const valid = await this.noteService.hasOnlyExpectedProperties(updateNoteDto);
    if (!valid) {
      throw new HttpException(
        'Invalid data.',
        HttpStatus.BAD_REQUEST
      );
    }

    const result = await this.noteService.update(+id, request.user.id, updateNoteDto);
    if (!result.affected) {
      throw new HttpException(
        'No valid entry found for provided ID.',
        HttpStatus.BAD_REQUEST
      );
    }

    return {
      message: 'Note updated successfully.',
      payload: {},
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Req() request: Request, @Param('id') id: string) {
    const result = await this.noteService.remove(+id, request.user.id);
    if (!result.affected) {
      throw new HttpException(
        'No valid entry found for provided ID.',
        HttpStatus.BAD_REQUEST
      );
    }

    return {
      message: 'Note deleted successfully.',
      payload: {},
    };
  }
}
