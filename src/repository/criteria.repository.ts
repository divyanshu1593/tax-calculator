import { Injectable } from '@nestjs/common';
import { DataDto } from 'src/dto/data.dto';
import { Criteria } from 'src/entity/criteria.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CriteriaRepository extends Repository<Criteria> {
  constructor(private dataSource: DataSource) {
    super(Criteria, dataSource.createEntityManager());
  }

  async getSurchargeSlabs(dataDto: DataDto) {
    const { age, financialYear, regime, userType, residencialStatus } = dataDto;

    const data = await this.createQueryBuilder('criteria')
      .select([
        'income_range',
        'income_range',
        'surcharge_percentage',
        'surcharge_percentage',
      ])
      .innerJoin(
        'surcharge_rates',
        'surcharge_rates',
        'criteria.surchargeSlab = surcharge_rates.surcharge_slab',
      )
      .where(`criteria.age_group_range @> ${age}`)
      .andWhere(`financial_year = '${financialYear}'`)
      .andWhere(`regime = '${regime}'`)
      .andWhere(`user_type = '${userType}'`)
      .andWhere(`residencial_status = '${residencialStatus}'`)
      .getRawMany();

    return data;
  }

  async getTaxSlabs(dataDto: DataDto, taxableIncome: number) {
    const { age, financialYear, regime, userType, residencialStatus } = dataDto;

    const data = await this.createQueryBuilder('criteria')
      .select([
        'income_range',
        'income_range',
        'tax_percentage',
        'tax_percentage',
      ])
      .innerJoin(
        'tax_rates',
        'tax_rates',
        'criteria.taxSlab = tax_rates.tax_slab',
      )
      .where(`criteria.age_group_range @> ${age}`)
      .andWhere(`financial_year = '${financialYear}'`)
      .andWhere(`regime = '${regime}'`)
      .andWhere(`user_type = '${userType}'`)
      .andWhere(`residencial_status = '${residencialStatus}'`)
      .andWhere(`'[0, ${taxableIncome}]' @> income_range`)
      .getRawMany();

    return data;
  }

  async getRebate(dataDto: DataDto) {
    const { age, financialYear, regime, userType, residencialStatus } = dataDto;

    const data = await this.createQueryBuilder('criteria')
      .select(['rebate_amount', 'rebate_amount', 'threshold', 'threshold'])
      .innerJoin('criteria.rebates', 'rebates')
      .where(`criteria.age_group_range @> ${age}`)
      .andWhere(`financial_year = '${financialYear}'`)
      .andWhere(`regime = '${regime}'`)
      .andWhere(`user_type = '${userType}'`)
      .andWhere(`residencial_status = '${residencialStatus}'`)
      .getRawOne();

    return data;
  }

  async getCessRate(dataDto: DataDto) {
    const { financialYear } = dataDto;

    const cessRate = await this.createQueryBuilder('criteria')
      .select([
        'criteria.financial_year',
        'criteria.financial_year',
        'cess_rate',
        'cess_rate',
      ])
      .innerJoin(
        'cess_rates',
        'cess_rates',
        'criteria.financial_year = cess_rates.financial_year',
      )
      .where(`criteria.financial_year = '${financialYear}'`)
      .groupBy('criteria.financial_year')
      .addGroupBy('cess_rate')
      .getRawOne();

    return cessRate;
  }
}
