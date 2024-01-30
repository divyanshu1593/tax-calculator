import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { InfoDto } from './dto/info.dto';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  test(@Query() infoDto: InfoDto) {
    return this.appService.calculateTotalTax(infoDto);
  }

  @Get('/func')
  func() {
    console.log(typeof process.env.DATABASE_PASSWORD);
    return process.env.DATABASE_PASSWORD;
  }
}
