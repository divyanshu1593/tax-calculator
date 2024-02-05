import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource, InsertResult, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UserCredentialDto } from 'src/dto/user-credential.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async signUp(userCredentialDto: UserCredentialDto): Promise<InsertResult> {
    const { username, password } = userCredentialDto;

    if (await this.findOneBy({ username })) {
      throw new NotAcceptableException('username already exists');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    return await this.insert({
      username,
      passwordHash,
    });
  }

  async verify(userCredentialDto: UserCredentialDto): Promise<User | null> {
    const { username, password } = userCredentialDto;
    const user = await this.findOneBy({
      username,
    });

    if (!user) throw new NotFoundException('username not found');

    if (!(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
