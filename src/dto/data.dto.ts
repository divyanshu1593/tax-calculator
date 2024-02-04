import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsString, Min } from 'class-validator';

export class DataDto {
  @IsDate()
  @Transform(({ value }) => new Date(value))
  financialYearStart: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  financialYearEnd: Date;

  @IsString()
  regime: string;

  @IsNumber()
  @Min(0)
  @Transform(({ value }) => +value)
  age: number;

  @IsString()
  residencialStatus: string;

  @IsString()
  userType: string;

  @IsNumber()
  @Min(0)
  @Transform(({ value }) => +value)
  grossIncome: number;

  @IsNumber()
  @Min(0)
  @Transform(({ value }) => +value)
  totalDeductions: number;
}
