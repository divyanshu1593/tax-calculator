import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CriteriaDto } from './dto/criteria.dto';
import { Deductions } from './deductions/entity/deductions.entity';
import { DeducitonsRepository } from './deductions/repository/deductions.repository';
import { CriteriaTransformer } from './pipes/criteria-transformer.pipe';
import { DataDto } from './dto/data.dto';
import { DataTransformer } from './pipes/data-transformer.pipe';
import { GetDeductionsLogger } from './logger/getDeductionsLogger/get-deductions-logger.interceptor';
import { CalcTaxLogger } from './logger/calculateTaxLogger/calc-tax-logger.interceptor';

@Controller('/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private deductionsRepository: DeducitonsRepository,
  ) {}

  @Get('/get-deductions')
  @UsePipes(CriteriaTransformer, ValidationPipe)
  @UseInterceptors(GetDeductionsLogger)
  getDeductions(@Query() criteriaDto: CriteriaDto): Promise<Deductions[]> {
    return this.deductionsRepository.getDeductions(criteriaDto);
  }

  @Get('/calc-tax')
  @UsePipes(DataTransformer, ValidationPipe)
  @UseInterceptors(CalcTaxLogger)
  calculateTax(@Query() dataDto: DataDto) {
    return this.appService.calculateTax(dataDto);
  }
}
