import { Module } from '@nestjs/common';
import { SurchargeService } from './surcharge.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurchargeRates } from './entity/surcharge-rates.entity';
import { CriteriaRepository } from 'src/repository/criteria.repository';
import { NormalTaxService } from 'src/normal-tax/normal-tax.service';

@Module({
  imports: [TypeOrmModule.forFeature([SurchargeRates])],
  providers: [SurchargeService, CriteriaRepository, NormalTaxService],
  exports: [SurchargeService],
})
export class SurchargeModule {}
