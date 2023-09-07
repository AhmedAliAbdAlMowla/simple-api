import { Injectable } from '@nestjs/common';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteEntity } from './entities/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly noteRepository: Repository<NoteEntity>,
  ) {}

  async create(createNoteDto: any) {
    let result = await this.noteRepository.save(createNoteDto);
    // Delete account id from retrieved note because we don't need it.
    delete result.account;
    return result;
  }


  async paginateNotes(pageNumber: number, pageSize: number, accountId: number) {
    const skip = (pageNumber - 1) * pageSize;

    const [notes, total] = await this.noteRepository
      .createQueryBuilder('note')
      .where('note.account_id = :accountId', { accountId })
      .take(pageSize)
      .skip(skip)
      .getManyAndCount();

    const totalPages = Math.ceil(total / pageSize);

    return {
      totalPages,
      currentPage: Number(pageNumber),
      pageSize: Number(pageSize),
      totalItems: Number(total),
      data: notes,
    };
  }

  
  async findOne(id: number, accountId: number) {
    const result = await this.noteRepository
      .createQueryBuilder('Note')
      .where('Note.id = :id', { id })
      .andWhere('Note.account_id = :accountId', { accountId })
      .getOne();

    return result;
  }

  async update(id: number, accountId: number, updateNoteDto: UpdateNoteDto) {
    const result = await this.noteRepository
      .createQueryBuilder()
      .update(NoteEntity)
      .set(updateNoteDto)
      .where('id = :id', { id })
      .andWhere('account_id = :accountId', { accountId })
      .execute();

    return result;
  }

  async remove(id: number, accountId: number) {
    const result = await this.noteRepository
      .createQueryBuilder('Note')
      .delete()
      .from(NoteEntity)
      .where('id = :id', { id })
      .andWhere('account_id = :accountId', { accountId })
      .execute();

    return result;
  }

  async hasOnlyExpectedProperties(requestBody: any): Promise<boolean> {
    // Define the expected property names
    const expectedProperties = ['excerpt', 'title'];

    // Get the keys of the object
    const objectKeys = Object.keys(requestBody);

    // Check if there are no extra properties in the object
    const hasNoExtraProperties = objectKeys.every((key) => expectedProperties.includes(key));

    // Return true if all expected properties are present and there are no extra properties
    return hasNoExtraProperties;
  }
}
