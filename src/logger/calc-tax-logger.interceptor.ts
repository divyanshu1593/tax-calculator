import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { CalcTaxLogRepository } from '../database/repository/calc-tax-log.repository';
import { CustomResponse } from 'src/interfaces/response.interface';
import { intermidiatoryData } from 'src/interfaces/intermidiatory-data.interface';

@Injectable()
export class CalcTaxLogger implements NestInterceptor {
  constructor(private calcTaxLoggerRepo: CalcTaxLogRepository) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<CustomResponse<intermidiatoryData>>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const currentTime = new Date();
    this.calcTaxLoggerRepo.logInput(currentTime, req.query);
    return next.handle().pipe(
      tap((val) => {
        this.calcTaxLoggerRepo.insertTaxes(currentTime, val.data);
      }),
    );
  }
}
