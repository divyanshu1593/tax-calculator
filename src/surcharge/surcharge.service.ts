import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataDto } from 'src/dto/data.dto';
import { NormalTaxService } from 'src/normal-tax/normal-tax.service';
import { CriteriaRepository } from 'src/database/repository/criteria.repository';

@Injectable()
export class SurchargeService {
  constructor(
    private criteriaRepository: CriteriaRepository,
    private normalTaxService: NormalTaxService,
  ) {}

  async getSurcharge(
    dataDto: DataDto,
    tax: number,
    taxableIncome: number,
  ): Promise<number> {
    const slab = await this.criteriaRepository.getSurchargeSlabs(dataDto);
    console.log('surcharge slab:', slab);

    for (const slabRow of slab) {
      const [lowerBound, higherBound] = slabRow.income_range
        .slice(1, slabRow.income_range.length - 1)
        .split(',')
        .map((val: string) => {
          if (val === '') return Infinity;
          return +val;
        });

      if (taxableIncome >= lowerBound && taxableIncome < higherBound) {
        return (tax * slabRow.surcharge_percentage) / 100;
      }
    }

    throw new NotFoundException('cant find surcharge slabs for given data');
  }

  async getMarginalRelief(
    dataDto: DataDto,
    currentTax: number,
    taxableIncome: number,
  ) {
    const slab = await this.criteriaRepository.getSurchargeSlabs(dataDto);
    let maxIncomeWithoutSurcharge;

    for (const slabRow of slab) {
      const [lowerBound, higherBound] = slabRow.income_range
        .slice(1, slabRow.income_range.length - 1)
        .split(',');

      if (lowerBound == 0) {
        maxIncomeWithoutSurcharge = higherBound - 1;
        break;
      }
    }

    if (!maxIncomeWithoutSurcharge) {
      throw new BadRequestException(
        'unable to find max income on which surcharge is not applicable',
      );
    }

    if (taxableIncome <= maxIncomeWithoutSurcharge) return 0;

    const marginalRelief =
      currentTax -
      (await this.normalTaxService.calculateTax(
        dataDto,
        maxIncomeWithoutSurcharge,
      )) -
      (taxableIncome - maxIncomeWithoutSurcharge);

    return Math.max(marginalRelief, 0);
  }
}
