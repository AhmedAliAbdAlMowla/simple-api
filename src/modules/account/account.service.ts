import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {

  const result = await  this.accountRepository.save(createAccountDto);

    return result;
  }

  findOneByEmail(email: string) {
    return  this.accountRepository.findOne({ where: { email } });
  }

}
