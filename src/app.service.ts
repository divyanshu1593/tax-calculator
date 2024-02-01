import { Injectable } from '@nestjs/common';
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

  calculateTotalTax() {}

  applyCess(tax: number) {
    return 0.04 * tax + tax;
  }
}
