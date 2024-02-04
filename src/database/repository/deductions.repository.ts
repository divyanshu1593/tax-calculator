import { DataSource, Repository } from 'typeorm';
import { Deductions } from '../entity/deductions.entity';
import { CriteriaDto } from 'src/dto/criteria.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeducitonsRepository extends Repository<Deductions> {
  constructor(private dataSource: DataSource) {
    super(Deductions, dataSource.createEntityManager());
  }

  async getDeductions(criteriaDto: CriteriaDto): Promise<Deductions[]> {
    const {
      financialYearStart,
      financialYearEnd,
      regime,
      age,
      residencialStatus,
      userType,
    } = criteriaDto;

    return await this.createQueryBuilder('deductions')
      .innerJoinAndSelect('deductions.criterias', 'criterias')
      .where(`criterias.age_group_range @> ${age}`)
      .andWhere(`criterias.user_type = '${userType}'`)
      .andWhere(`criterias.regime = '${regime}'`)
      .andWhere(`criterias.residencial_status = '${residencialStatus}'`)
      .andWhere(`criterias.financial_year_start = '${financialYearStart}'`)
      .andWhere(`criterias.financial_year_end = '${financialYearEnd}'`)
      .getMany();
  }
}
