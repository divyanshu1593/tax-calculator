import { Transform } from 'class-transformer';
import { IsDate } from 'class-validator';

export class GetLogDto {
  @IsDate()
  @Transform(({ value }) => new Date(value))
  start: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  end: Date;
}
