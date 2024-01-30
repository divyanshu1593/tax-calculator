import { Deductions } from 'src/deductions/entity/deductions.entity';
import { Rebates } from 'src/rebate/entity/rebates.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Criteria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('daterange')
  financial_year: string;

  @Column()
  regime: string;

  @Column('int4range')
  age_group_range: string;

  @Column()
  user_type: string;

  @Column()
  residencial_status: string;

  @Column()
  taxSlab: string;

  @Column()
  surchargeSlab: string;

  @ManyToMany(() => Deductions, (deductions) => deductions.criterias)
  @JoinTable()
  deductions: Deductions[];

  @ManyToMany(() => Rebates, (rebates) => rebates.criterias)
  @JoinTable()
  rebates: Rebates[];
}
