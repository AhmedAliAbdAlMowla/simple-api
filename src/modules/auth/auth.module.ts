import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../account/entities/account.entity';
import { AccountService } from '../account/account.service';
import { JWTService } from './jwt.service';
import { AuthGuard } from './guard/auth.guard';
@Module({
  imports:[TypeOrmModule.forFeature([AccountEntity])],
  controllers: [AuthController],
  providers: [AuthService, AccountService,AuthGuard, JWTService,],
})
export class AuthModule {}
