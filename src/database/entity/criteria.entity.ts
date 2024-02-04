import { Deductions } from 'src/database/entity/deductions.entity';
import { Rebates } from 'src/database/entity/rebates.entity';
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

  @Column('date')
  financial_year_start: Date;

  @Column('date')
  financial_year_end: Date;

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
