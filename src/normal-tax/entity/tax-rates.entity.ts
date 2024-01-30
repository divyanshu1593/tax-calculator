import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TaxRates {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int8range')
  income_range: string;

  @Column('int')
  tax_percentage: number;

  @Column()
  tax_slab: string;
}
