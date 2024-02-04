import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CessRates {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  cess_rate: number;

  @Column('date')
  financial_year_start: Date;

  @Column('date')
  financial_year_end: Date;
}
