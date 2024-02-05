import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserRepository } from 'src/database/repository/user.repository';
import { UserCredentialDto } from 'src/dto/user-credential.dto';
import { LocalAuthGuard } from './local.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  signUp(@Body() userCredentialDto: UserCredentialDto) {
    this.userRepository.signUp(userCredentialDto);
  }

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  signIn() {
    return 'login successful';
  }
}
