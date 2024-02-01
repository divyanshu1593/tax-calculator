import { Injectable } from '@nestjs/common';
import { DataDto } from 'src/dto/data.dto';

@Injectable()
export class DeductionsService {
  getTaxableIncome(dataDto: DataDto): number {
    const { grossIncome, totalDeductions } = dataDto;
    return grossIncome - totalDeductions;
  }
}
