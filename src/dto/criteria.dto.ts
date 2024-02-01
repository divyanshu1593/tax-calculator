import { IsNumber, IsString } from 'class-validator';

export class CriteriaDto {
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
}
