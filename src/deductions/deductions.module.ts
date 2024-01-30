import { Module } from '@nestjs/common';
import { DeductionsService } from './deductions.service';

@Module({
  providers: [DeductionsService],
  exports: [DeductionsService],
})
export class DeductionsModule {}
