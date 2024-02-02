import { Injectable } from '@nestjs/common';
import { DeductionsService } from './deductions/deductions.service';
import { NormalTaxService } from './normal-tax/normal-tax.service';
import { RebateService } from './rebate/rebate.service';
import { SurchargeService } from './surcharge/surcharge.service';
import { DataDto } from './dto/data.dto';
import { CriteriaRepository } from './repository/criteria.repository';

@Injectable()
export class AppService {
  constructor(
    private deductionsService: DeductionsService,
    private normalTaxService: NormalTaxService,
    private rebateService: RebateService,
    private surchargeService: SurchargeService,
    private criteriaRepository: CriteriaRepository,
  ) {}

  async calculateTax(dataDto: DataDto): Promise<number> {
    console.log('normal income', dataDto.grossIncome);
    const taxableIncome = this.deductionsService.getTaxableIncome(dataDto);
    console.log('income after deduction:', taxableIncome);

    let tax = await this.normalTaxService.calculateTax(dataDto, taxableIncome);
    console.log('normal tax:', tax);
    tax += await this.surchargeService.getSurcharge(
      dataDto,
      tax,
      taxableIncome,
    );
    console.log('tax + surcharge:', tax);
    tax -= await this.surchargeService.getMarginalRelief(
      dataDto,
      tax,
      taxableIncome,
    );
    console.log('tax + surchage - mr', tax);
    tax -= await this.rebateService.getRabates(dataDto, taxableIncome);
    tax = Math.max(tax, 0);
    console.log('tax after rebate', tax);

    tax +=
      (tax * (await this.criteriaRepository.getCessRate(dataDto)).cess_rate) /
      100;

    return +tax.toFixed(2);
  }
}
