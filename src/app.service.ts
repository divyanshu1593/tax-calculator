import { Injectable } from '@nestjs/common';
import { InfoDto } from './dto/info.dto';
import { DeductionsService } from './deductions/deductions.service';
import { NormalTaxService } from './normal-tax/normal-tax.service';
import { RebateService } from './rebate/rebate.service';
import { SurchargeService } from './surcharge/surcharge.service';

@Injectable()
export class AppService {
  constructor(
    private deductionsService: DeductionsService,
    private normalTaxService: NormalTaxService,
    private rebateService: RebateService,
    private surchargeService: SurchargeService,
  ) {}

  calculateTotalTax(infoDto: InfoDto) {
    infoDto.taxableIncome =
      infoDto.grossIncome - this.deductionsService.calculateDeductions();
    infoDto.tax = this.normalTaxService.calculateNormalTax();
    infoDto.tax -= this.rebateService.calculateRebate();
    infoDto.tax += this.surchargeService.calculateSurcharge();
    infoDto.tax = this.applyCess(infoDto.tax);

    return infoDto.tax;
  }

  applyCess(tax: number) {
    return 0.04 * tax + tax;
  }
}
