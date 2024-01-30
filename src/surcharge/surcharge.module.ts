import { Module } from '@nestjs/common';
import { SurchargeService } from './surcharge.service';

@Module({
  providers: [SurchargeService],
  exports: [SurchargeService],
})
export class SurchargeModule {}
