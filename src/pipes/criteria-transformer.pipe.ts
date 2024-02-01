import { Injectable, PipeTransform } from '@nestjs/common';
import { CriteriaDto } from 'src/dto/criteria.dto';

@Injectable()
export class CriteriaTransformer implements PipeTransform {
  transform(queryInput: any): CriteriaDto {
    queryInput.age = +queryInput.age;

    const year = +queryInput.financialYear.slice(0, 4);
    queryInput.financialYear = `[${year}-04-01,${year + 1}-04-01)`;

    return queryInput;
  }
}
