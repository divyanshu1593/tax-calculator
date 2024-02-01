import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configDotenv } from 'dotenv';
import { InstanceToPlainInterceptor } from './interceptor/exclude-criterias.interceptor';

async function bootstrap() {
  configDotenv();
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new InstanceToPlainInterceptor());
  await app.listen(3000);
}
bootstrap();
