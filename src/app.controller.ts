import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CriteriaDto } from './dto/criteria.dto';
import { CriteriaRepository } from './repository/criteria.repository';
import { Deductions } from './deductions/entity/deductions.entity';
import { DeducitonsRepository } from './deductions/repository/deductions.repository';
import { CriteriaTransformer } from './pipes/criteria-transformer.pipe';
import { DataDto } from './dto/data.dto';
import { DataTransformer } from './pipes/data-transformer.pipe';

@Controller('/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private criteriaRepository: CriteriaRepository,
    private deductionsRepository: DeducitonsRepository,
  ) {}

  @Get('/get-deductions')
  @UsePipes(CriteriaTransformer, ValidationPipe)
  getDeductions(@Query() criteriaDto: CriteriaDto): Promise<Deductions[]> {
    return this.deductionsRepository.getDeductions(criteriaDto);
  }

  @Get('/calc-tax')
  @UsePipes(DataTransformer, ValidationPipe)
  calculateTax(@Query() dataDto: DataDto) {
    return this.appService.calculateTax(dataDto);
  }
}
