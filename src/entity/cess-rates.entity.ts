import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CessRates {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  cess_rate: number;

  @Column('daterange')
  financial_year: string;
}
