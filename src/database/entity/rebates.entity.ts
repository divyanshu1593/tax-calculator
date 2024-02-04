import { Criteria } from 'src/database/entity/criteria.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rebates {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('int')
  threshold: number;

  @Column('int')
  rebate_amount: number;

  @ManyToMany(() => Criteria, (criteria) => criteria.rebates)
  criterias: Criteria[];
}
