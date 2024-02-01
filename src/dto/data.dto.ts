import { IsNumber, IsString } from 'class-validator';

export class DataDto {
  @IsString()
  financialYear: string;

  @IsString()
  regime: string;

  @IsNumber()
  age: number;

  @IsString()
  residencialStatus: string;

  @IsString()
  userType: string;

  @IsNumber()
  grossIncome: number;

  @IsNumber()
  totalDeductions: number;
}
