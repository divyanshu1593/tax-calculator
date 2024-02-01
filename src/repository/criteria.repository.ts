import { Injectable } from '@nestjs/common';
import { Criteria } from 'src/entity/criteria.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CriteriaRepository extends Repository<Criteria> {
  constructor(private dataSource: DataSource) {
    super(Criteria, dataSource.createEntityManager());
  }
}
