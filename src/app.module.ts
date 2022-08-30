import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createClient } from '@redis/client';
import { ormConfig } from '../ormconfig';
import { AppController } from './app.controller';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MasterEntity } from './entities/master.entity';
import { OrderEntity } from './entities/order_entity';

@Module({
  controllers: [AppController],
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(ormConfig),
    TypeOrmModule.forFeature([OrderEntity, MasterEntity]),
  ],
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
})
export class AppModule {}
