import { Module } from '@nestjs/common';
import { SurchargeService } from './surcharge.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurchargeRates } from './entity/surcharge-rates.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SurchargeRates])],
  providers: [SurchargeService],
  exports: [SurchargeService],
})
export class SurchargeModule {}
