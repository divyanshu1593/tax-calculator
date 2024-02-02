import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { CalcTaxLogRepository } from './calc-tax-log.repository';

@Injectable()
export class CalcTaxLogger implements NestInterceptor {
  constructor(private calcTaxLoggerRepo: CalcTaxLogRepository) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const currentTime = Date.now();
    this.calcTaxLoggerRepo.logInput(currentTime, req.query);
    return next.handle().pipe(
      tap((val) => {
        this.calcTaxLoggerRepo.insertTaxes(currentTime, val.intermidiatoryData);
        delete val.intermidiatory;
      }),
    );
  }
}
