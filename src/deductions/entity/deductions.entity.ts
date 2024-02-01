import { Exclude } from '@nestjs/class-transformer';
import { Criteria } from 'src/entity/criteria.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Deductions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Exclude()
  @ManyToMany(() => Criteria, (criteria) => criteria.deductions)
  criterias: Criteria[];
}
