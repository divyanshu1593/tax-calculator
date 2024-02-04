import { Injectable } from '@nestjs/common';
import { DataDto } from 'src/dto/data.dto';
import { CriteriaRepository } from 'src/database/repository/criteria.repository';

@Injectable()
export class RebateService {
  constructor(private criteriaRepository: CriteriaRepository) {}

  async getRabates(dataDto: DataDto, taxableIncome: number): Promise<number> {
    const rebate = await this.criteriaRepository.getRebate(dataDto);
    if (taxableIncome <= rebate.threshold) {
      return rebate.rebate_amount;
    }

    return 0;
  }
}
