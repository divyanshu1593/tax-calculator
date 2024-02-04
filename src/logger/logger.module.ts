import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetDeductionsLog } from '../database/entity/get-deductions-log.entity';
import { GetDeductionsLogRepository } from '../database/repository/get-deductions-log.repository';
import { CalcTaxLog } from '../database/entity/calc-tax-log.entity';
import { CalcTaxLogRepository } from '../database/repository/calc-tax-log.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GetDeductionsLog, CalcTaxLog])],
  providers: [GetDeductionsLogRepository, CalcTaxLogRepository],
  exports: [GetDeductionsLogRepository, CalcTaxLogRepository],
})
export class LoggerModule {}
