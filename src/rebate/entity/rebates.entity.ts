import { Criteria } from 'src/entity/criteria.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rebates {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Criteria, (criteria) => criteria.rebates)
  criterias: Criteria[];
}
