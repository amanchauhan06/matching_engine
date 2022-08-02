import { Module } from '@nestjs/common';
import { createClient } from '@redis/client';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CassandraModule } from './cassandra/cassandra.module';
import { OrderRepository } from './order.repository';

@Module({
  controllers: [AppController],
  providers: [
    {
      provide: 'REDIS_OPTIONS',
      useValue: {
        url: process.env.REDIS_URL || 'redis://localhost:6379',
      },
    },
    {
      inject: ['REDIS_OPTIONS'],
      provide: 'REDIS_CLIENT',
      useFactory: async (options: { url: string }) => {
        const client = createClient(options);
        await client.connect();
        return client;
      },
    },
    AppService,
    OrderRepository,
  ],
  exports: ['REDIS_CLIENT'],
  imports: [CassandraModule],
})
export class AppModule {}
