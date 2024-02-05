import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/database/entity/user.entity';
import { UserRepository } from 'src/database/repository/user.repository';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super();
  }

  async validate(username: string, password: string): Promise<User | null> {
    return this.userRepository.verify({ username, password });
  }
}
