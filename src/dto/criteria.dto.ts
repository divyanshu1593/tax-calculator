import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsString, Min } from 'class-validator';

export class CriteriaDto {
  @IsDate()
  @Transform(({ value }) => new Date(value))
  financialYearStart: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  financialYearEnd: Date;

  @IsString()
  regime: string;

  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(0)
  age: number;

  @IsString()
  residencialStatus: string;

  @IsString()
  userType: string;
}
