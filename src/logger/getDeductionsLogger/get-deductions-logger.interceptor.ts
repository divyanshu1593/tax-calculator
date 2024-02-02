import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { GetDeductionsLogRepository } from './get-deductions-log.repository';

type NewType = Promise<Observable<any>>;

@Injectable()
export class GetDeductionsLogger implements NestInterceptor {
  constructor(private getDeductionsLogRepo: GetDeductionsLogRepository) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | NewType {
    const req = context.switchToHttp().getRequest();
    const currentTime = Date.now();
    this.getDeductionsLogRepo.logInput(currentTime, req.query);
    return next.handle().pipe(
      tap((deductionArray) => {
        for (const deduction of deductionArray) {
          this.getDeductionsLogRepo.insertDeductions(
            currentTime,
            deduction.name,
            deduction.description,
          );
        }
      }),
    );
  }
}
