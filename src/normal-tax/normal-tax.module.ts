import { Module } from '@nestjs/common';
import { NormalTaxService } from './normal-tax.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxRates } from './entity/tax-rates.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaxRates])],
  providers: [NormalTaxService],
  exports: [NormalTaxService],
})
export class NormalTaxModule {}
