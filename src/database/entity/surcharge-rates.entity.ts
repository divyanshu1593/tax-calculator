import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SurchargeRates {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int8range')
  income_range: string;

  @Column('int')
  surcharge_percentage: number;

  @Column()
  surcharge_slab: string;
}
