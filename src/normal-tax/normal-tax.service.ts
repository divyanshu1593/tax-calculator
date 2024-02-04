import { Injectable } from '@nestjs/common';
import { DataDto } from 'src/dto/data.dto';
import { CriteriaRepository } from 'src/database/repository/criteria.repository';

@Injectable()
export class NormalTaxService {
  constructor(private criteriaRepository: CriteriaRepository) {}

  async calculateTax(dataDto: DataDto, taxableIncome: number) {
    const slab = await this.criteriaRepository.getTaxSlabs(
      dataDto,
      taxableIncome,
    );
    let tax = 0;
    console.log(slab);

    for (const slabRow of slab) {
      const [lowerBound, higherBound] = slabRow.income_range
        .slice(1, slabRow.income_range.length - 1)
        .split(',')
        .map((val: string) => {
          if (val === '') return Infinity;
          return +val;
        });

      tax += this.applyTax(
        lowerBound,
        higherBound - 1,
        slabRow.tax_percentage,
        taxableIncome,
      );
    }

    return tax;
  }

  applyTax(
    incomeLowerBound: number,
    incomeHigherBound: number,
    taxPercentage: number,
    taxableIncome: number,
  ): number {
    if (taxableIncome > incomeHigherBound) {
      return ((incomeHigherBound - incomeLowerBound) * taxPercentage) / 100;
    }

    return ((taxableIncome - incomeLowerBound) * taxPercentage) / 100;
  }
}
