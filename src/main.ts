import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // set prefix Url
  app.setGlobalPrefix('api');

  // set PORT
  const PORT = process.env.PORT || 9999;

  await app.listen(PORT);

  // log quick start url
  Logger.log(`http://127.0.0.1:${PORT}/api/ API Server is Running`);
}
bootstrap();
