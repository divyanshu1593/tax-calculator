import { Module } from '@nestjs/common';
import { RebateService } from './rebate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rebates } from './entity/rebates.entity';
import { CriteriaRepository } from 'src/repository/criteria.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Rebates])],
  providers: [RebateService, CriteriaRepository],
  exports: [RebateService],
})
export class RebateModule {}
