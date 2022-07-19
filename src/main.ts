import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqps://iavpjlft:N4u9fnHJvjeK-Cd8_vd5Y4WN5BUAsrsz@moose.rmq.cloudamqp.com/iavpjlft',
        ],
        queue: 'matching_service',
        queueOptions: { durable: false },
      },
    },
  );
  await app.listen();
}
bootstrap();
