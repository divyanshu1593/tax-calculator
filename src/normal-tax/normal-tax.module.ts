import { Module } from '@nestjs/common';
import { NormalTaxService } from './normal-tax.service';

@Module({
  providers: [NormalTaxService],
  exports: [NormalTaxService],
})
export class NormalTaxModule {}
