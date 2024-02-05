import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/database/repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entity/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.stretegy';

@Module({
  controllers: [AuthController],
  providers: [UserRepository, LocalStrategy],
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
})
export class AuthModule {}
