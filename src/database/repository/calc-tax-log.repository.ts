import { DataSource, InsertResult, Repository } from 'typeorm';
import { CalcTaxLog } from '../entity/calc-tax-log.entity';
import { Injectable } from '@nestjs/common';
import { intermidiatoryData } from 'src/interfaces/intermidiatory-data.interface';
import { reqParamInterface } from 'src/interfaces/req-param.interface';
import { GetLogDto } from 'src/dto/get-log.dto';

@Injectable()
export class CalcTaxLogRepository extends Repository<CalcTaxLog> {
  constructor(private dataSource: DataSource) {
    super(CalcTaxLog, dataSource.createEntityManager());
  }

  async logInput(
    date: Date,
    reqParams: reqParamInterface,
  ): Promise<InsertResult> {
    const {
      financialYearStart,
      financialYearEnd,
      regime,
      age,
      residencialStatus,
      userType,
      grossIncome,
      totalDeductions,
    } = reqParams;

    const result = await this.insert({
      datetime: date,
      financialYearStart,
      financialYearEnd,
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

  async insertTaxes(date: Date, intermidiatoryData: intermidiatoryData) {
    await this.createQueryBuilder('getDeducitonsLog')
      .update()
      .set(intermidiatoryData)
      .where({
        datetime: date,
      })
      .execute();
  }

  async getCalcTaxLog(getLogDto: GetLogDto) {
    const { start, end } = getLogDto;

    return await this.createQueryBuilder('calcTaxLog')
      .select()
      .where(`calcTaxLog.datetime between '${start}' and '${end}'`)
      .getMany();
  }
}
