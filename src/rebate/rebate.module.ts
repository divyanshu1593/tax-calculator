import { Module } from '@nestjs/common';
import { RebateService } from './rebate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rebates } from './entity/rebates.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rebates])],
  providers: [RebateService],
  exports: [RebateService],
})
export class RebateModule {}
