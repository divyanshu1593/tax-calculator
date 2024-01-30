import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeductionsModule } from './deductions/deductions.module';
import { NormalTaxModule } from './normal-tax/normal-tax.module';
import { RebateModule } from './rebate/rebate.module';
import { SurchargeModule } from './surcharge/surcharge.module';

@Module({
  imports: [DeductionsModule, NormalTaxModule, RebateModule, SurchargeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
