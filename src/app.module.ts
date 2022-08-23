import { Module } from '@nestjs/common';
import { createClient } from '@redis/client';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  providers: [
    {
      provide: 'REDIS_OPTIONS',
      useValue: {
        url: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD,
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
    // OrderRepository,
  ],
  exports: ['REDIS_CLIENT'],
  // imports: [CassandraModule],
})
export class AppModule {}
