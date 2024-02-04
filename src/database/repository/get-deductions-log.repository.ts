import { DataSource, InsertResult, Repository } from 'typeorm';
import { GetDeductionsLog } from '../entity/get-deductions-log.entity';
import { Injectable } from '@nestjs/common';
import { reqParamInterface } from 'src/interfaces/req-param.interface';
import { GetLogDto } from 'src/dto/get-log.dto';

@Injectable()
export class GetDeductionsLogRepository extends Repository<GetDeductionsLog> {
  constructor(private dataSource: DataSource) {
    super(GetDeductionsLog, dataSource.createEntityManager());
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
    } = reqParams;

    const result = await this.insert({
      datetime: date,
      financialYearStart,
      financialYearEnd,
      regime,
      age: +age,
      residencialStatus,
      userType,
      deductionName: [],
      dedeuctionDescription: [],
    });

    return result;
  }

  async insertDeductions(date: Date, name: string, description: string) {
    await this.createQueryBuilder('getDeducitonsLog')
      .update()
      .set({
        deductionName: () => `array_append("deductionName", '${name}')`,
        dedeuctionDescription: () =>
          `array_append("dedeuctionDescription", '${description}')`,
      })
      .where({
        datetime: date,
      })
      .execute();
  }

  async getDeducitonsLog(getLogDto: GetLogDto) {
    const { start, end } = getLogDto;

    return await this.createQueryBuilder('getDeductionsLog')
      .select()
      .where(`getDeductionsLog.datetime between '${start}' and '${end}'`)
      .getMany();
  }
}
