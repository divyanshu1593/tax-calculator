import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeductionsModule } from './deductions/deductions.module';
import { NormalTaxModule } from './normal-tax/normal-tax.module';
import { RebateModule } from './rebate/rebate.module';
import { SurchargeModule } from './surcharge/surcharge.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Criteria } from './entity/criteria.entity';
import { CessRates } from './entity/cess-rates.entity';

@Module({
  imports: [
    DeductionsModule,
    NormalTaxModule,
    RebateModule,
    SurchargeModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT! || 5432,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Criteria, CessRates]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
