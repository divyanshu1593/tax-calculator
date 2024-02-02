import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetDeductionsLog } from './getDeductionsLogger/get-deductions-log.entity';
import { GetDeductionsLogRepository } from './getDeductionsLogger/get-deductions-log.repository';
import { CalcTaxLog } from './calculateTaxLogger/calc-tax-log.entity';
import { CalcTaxLogRepository } from './calculateTaxLogger/calc-tax-log.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GetDeductionsLog, CalcTaxLog])],
  providers: [GetDeductionsLogRepository, CalcTaxLogRepository],
  exports: [GetDeductionsLogRepository, CalcTaxLogRepository],
})
export class LoggerModule {}
