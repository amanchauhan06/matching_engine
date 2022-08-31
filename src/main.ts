import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 8001);
  await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.REDIS,
    options: {
      url: process.env.REDIS_URL||'redis://127.0.0.1:6379',
      password: process.env.REDIS_PASSWORD||'redis',
    },
  }).then((val) => {
    console.log('Started');
    val.listen();
  });
}
bootstrap();
