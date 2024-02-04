import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configDotenv } from 'dotenv';
import { InstanceToPlainInterceptor } from './interceptor/exclude-criterias.interceptor';
import { ExceptionResponseFilter } from './exception-filters/res-type.exception-filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  configDotenv();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ExceptionResponseFilter());
  app.useGlobalInterceptors(new InstanceToPlainInterceptor());
  await app.listen(3000);
}
bootstrap();
