import { Module } from '@nestjs/common';
import { DeductionsService } from './deductions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deductions } from '../database/entity/deductions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deductions])],
  providers: [DeductionsService],
  exports: [DeductionsService],
})
export class DeductionsModule {}
