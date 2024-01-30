import { Module } from '@nestjs/common';
import { RebateService } from './rebate.service';

@Module({
  providers: [RebateService],
  exports: [RebateService],
})
export class RebateModule {}
