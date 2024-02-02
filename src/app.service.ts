import { Injectable } from '@nestjs/common';
import { DeductionsService } from './deductions/deductions.service';
import { NormalTaxService } from './normal-tax/normal-tax.service';
import { RebateService } from './rebate/rebate.service';
import { SurchargeService } from './surcharge/surcharge.service';
import { DataDto } from './dto/data.dto';
import { CriteriaRepository } from './repository/criteria.repository';

interface intermidiatoryData {
  normalIncome: number;
  taxableIncome: number;
  normalTax: number;
  taxWithSurcharge: number;
  taxWithMarginalRelif: number;
  taxAfterRebate: number;
  finalTax: number;
}

@Injectable()
export class AppService {
  constructor(
    private deductionsService: DeductionsService,
    private normalTaxService: NormalTaxService,
    private rebateService: RebateService,
    private surchargeService: SurchargeService,
    private criteriaRepository: CriteriaRepository,
  ) {}

  async calculateTax(dataDto: DataDto): Promise<any> {
    const taxableIncome = this.deductionsService.getTaxableIncome(dataDto);
    let tax = await this.normalTaxService.calculateTax(dataDto, taxableIncome);

    const intermidiatoryData: intermidiatoryData = {
      normalIncome: dataDto.grossIncome,
      taxableIncome,
      normalTax: tax,
      taxWithSurcharge: 0,
      taxWithMarginalRelif: 0,
      taxAfterRebate: 0,
      finalTax: 0,
    };

    tax += await this.surchargeService.getSurcharge(
      dataDto,
      tax,
      taxableIncome,
    );
    intermidiatoryData.taxWithSurcharge = tax;

    tax -= await this.surchargeService.getMarginalRelief(
      dataDto,
      tax,
      taxableIncome,
    );
    intermidiatoryData.taxWithMarginalRelif = tax;

    tax -= await this.rebateService.getRabates(dataDto, taxableIncome);
    tax = Math.max(tax, 0);
    intermidiatoryData.taxAfterRebate = tax;
    tax +=
      (tax * (await this.criteriaRepository.getCessRate(dataDto)).cess_rate) /
      100;
    intermidiatoryData.finalTax = tax;

    return {
      tax: +tax.toFixed(2),
      intermidiatoryData,
    };
  }
}
