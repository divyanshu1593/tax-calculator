import { DataSource, InsertResult, Repository } from 'typeorm';
import { CalcTaxLog } from './calc-tax-log.entity';
import { Injectable } from '@nestjs/common';

interface reqParamInterface {
  financialYear: string;
  regime: string;
  age: string;
  residencialStatus: string;
  userType: string;
  grossIncome: string;
  totalDeductions: string;
}

interface IntermidiatoryData {
  normalIncome: number;
  taxableIncome: number;
  normalTax: number;
  taxWithSurcharge: number;
  taxWithMarginalRelif: number;
  taxAfterRebate: number;
  finalTax: number;
}

@Injectable()
export class CalcTaxLogRepository extends Repository<CalcTaxLog> {
  constructor(private dataSource: DataSource) {
    super(CalcTaxLog, dataSource.createEntityManager());
  }

  async logInput(
    timestamp: number,
    reqParams: reqParamInterface,
  ): Promise<InsertResult> {
    const {
      financialYear,
      regime,
      age,
      residencialStatus,
      userType,
      grossIncome,
      totalDeductions,
    } = reqParams;

    const result = await this.insert({
      timestamp,
      financialYear,
      age: +age,
      residencialStatus,
      regime,
      userType,
      grossIncome: +grossIncome,
      totalDeductions: +totalDeductions,
      normalIncome: -1,
      taxableIncome: -1,
      normalTax: -1,
      taxWithSurcharge: -1,
      taxWithMarginalRelif: -1,
      taxAfterRebate: -1,
      finalTax: -1,
    });

    return result;
  }

  async insertTaxes(timestamp: number, intermidiatoryData: IntermidiatoryData) {
    await this.createQueryBuilder('getDeducitonsLog')
      .update()
      .set(intermidiatoryData)
      .where({
        timestamp,
      })
      .execute();
  }
}
