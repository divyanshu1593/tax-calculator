import { DataSource, InsertResult, Repository } from 'typeorm';
import { GetDeductionsLog } from './get-deductions-log.entity';
import { Injectable } from '@nestjs/common';

interface reqParamInterface {
  financialYear: string;
  regime: string;
  age: string;
  residencialStatus: string;
  userType: string;
}

@Injectable()
export class GetDeductionsLogRepository extends Repository<GetDeductionsLog> {
  constructor(private dataSource: DataSource) {
    super(GetDeductionsLog, dataSource.createEntityManager());
  }

  async logInput(
    timestamp: number,
    reqParams: reqParamInterface,
  ): Promise<InsertResult> {
    const { financialYear, regime, age, residencialStatus, userType } =
      reqParams;

    const result = await this.insert({
      timestamp,
      financialYear,
      regime,
      age: +age,
      residencialStatus,
      userType,
      deductionName: [],
      dedeuctionDescription: [],
    });

    return result;
  }

  async insertDeductions(timestamp: number, name: string, description: string) {
    await this.createQueryBuilder('getDeducitonsLog')
      .update()
      .set({
        deductionName: () => `array_append("deductionName", '${name}')`,
        dedeuctionDescription: () =>
          `array_append("dedeuctionDescription", '${description}')`,
      })
      .where({
        timestamp,
      })
      .execute();
  }
}
