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
    const taxableIncome = this.deductionsService.getTaxableIncome(dataDto);

    let tax = await this.normalTaxService.calculateTax(dataDto, taxableIncome);
    tax += await this.surchargeService.getSurcharge(
      dataDto,
      tax,
      taxableIncome,
    );
    tax -= await this.surchargeService.getMarginalRelief(
      dataDto,
      tax,
      taxableIncome,
    );
    tax -= await this.rebateService.getRabates(dataDto, taxableIncome);
    tax = Math.max(tax, 0);

    tax +=
      (tax * (await this.criteriaRepository.getCessRate(dataDto)).cess_rate) /
      100;

    return tax;
  }
}
