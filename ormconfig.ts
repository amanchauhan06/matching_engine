import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { OrderEntity } from 'src/entities/order_entity';
import { DataSource } from 'typeorm';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_URL,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  autoLoadEntities: true,
  entities: [
    'dist/src/entities/**/*{.ts,.js}',
  ],
  database: 'postgres',
  synchronize: false,
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  logging: true,
};

export const dataSource: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_URL,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  entities: [
    'dist/src/entities/**/*{.ts,.js}',
  ],
  database: 'postgres',
  synchronize: false,
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  logging: true,
});
dataSource.initialize().then(() => {
  {
    console.log('DataSource initialized');
  }
});
