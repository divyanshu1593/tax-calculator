import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CalcTaxLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  timestamp: number;

  @Column()
  financialYear: string;

  @Column()
  regime: string;

  @Column()
  age: number;

  @Column()
  residencialStatus: string;

  @Column()
  userType: string;

  @Column('float')
  grossIncome: number;

  @Column('float')
  totalDeductions: number;

  @Column('float')
  normalIncome: number;

  @Column('float')
  taxableIncome: number;

  @Column('float')
  normalTax: number;

  @Column('float')
  taxWithSurcharge: number;

  @Column('float')
  taxWithMarginalRelif: number;

  @Column('float')
  taxAfterRebate: number;

  @Column('float')
  finalTax: number;
}
