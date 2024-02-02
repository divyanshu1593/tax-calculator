import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GetDeductionsLog {
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

  @Column('varchar', { array: true })
  deductionName: string[];

  @Column('varchar', { array: true })
  dedeuctionDescription: string[];
}
