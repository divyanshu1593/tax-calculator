import { Injectable, PipeTransform } from '@nestjs/common';
import { DataDto } from 'src/dto/data.dto';

@Injectable()
export class DataTransformer implements PipeTransform {
  transform(queryInput: any): DataDto {
    queryInput.age = +queryInput.age;
    queryInput.grossIncome = +queryInput.grossIncome;
    queryInput.totalDeductions = +queryInput.totalDeductions;

    return queryInput;
  }
}
