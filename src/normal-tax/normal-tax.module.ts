import { Module } from '@nestjs/common';
import { NormalTaxService } from './normal-tax.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxRates } from './entity/tax-rates.entity';
import { CriteriaRepository } from 'src/repository/criteria.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TaxRates])],
  providers: [NormalTaxService, CriteriaRepository],
  exports: [NormalTaxService],
})
export class NormalTaxModule {}
