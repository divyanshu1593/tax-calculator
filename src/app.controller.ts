import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CriteriaDto } from './dto/criteria.dto';
import { Deductions } from './database/entity/deductions.entity';
import { DeducitonsRepository } from './database/repository/deductions.repository';
import { DataDto } from './dto/data.dto';
import { GetDeductionsLogger } from './logger/get-deductions-logger.interceptor';
import { CalcTaxLogger } from './logger/calc-tax-logger.interceptor';
import { CustomResponse } from './interfaces/response.interface';
import { intermidiatoryData } from './interfaces/intermidiatory-data.interface';
import { GetLogDto } from './dto/get-log.dto';
import { GetDeductionsLogRepository } from './database/repository/get-deductions-log.repository';
import { CalcTaxLogRepository } from './database/repository/calc-tax-log.repository';

@Controller('/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private deductionsRepository: DeducitonsRepository,
    private getDeductionsLogRepository: GetDeductionsLogRepository,
    private calcTaxLogRepository: CalcTaxLogRepository,
  ) {}

  @Get('/get-deductions')
  @UseInterceptors(GetDeductionsLogger)
  async getDeductions(
    @Query() criteriaDto: CriteriaDto,
  ): Promise<CustomResponse<Deductions[]>> {
    return {
      isError: false,
      message: '',
      data: await this.deductionsRepository.getDeductions(criteriaDto),
    };
  }

  @Get('/calc-tax')
  @UseInterceptors(CalcTaxLogger)
  async calculateTax(
    @Query() dataDto: DataDto,
  ): Promise<CustomResponse<intermidiatoryData>> {
    return {
      isError: false,
      message: '',
      data: await this.appService.calculateTax(dataDto),
    };
  }

  @Get('/get-deductions-log')
  getDeductionslogs(@Query() getLogDto: GetLogDto) {
    return this.getDeductionsLogRepository.getDeducitonsLog(getLogDto);
  }

  @Get('/get-calc-tax-log')
  getCalcTaxlogs(@Query() getLogDto: GetLogDto) {
    return this.calcTaxLogRepository.getCalcTaxLog(getLogDto);
  }
}
