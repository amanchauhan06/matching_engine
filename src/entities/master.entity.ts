import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from './order_entity';

@Entity()
export class MasterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  tradingsymbol: string;
  @Column()
  name: String;
  @Column()
  instrument_type: String;
  @Column()
  segment: String;
  @Column()
  exchange: String;
  @Column()
  data_type: String;
  @Column()
  key: String;
  @Column()
  from: String;
  @Column()
  to: String;
  @OneToMany(() => OrderEntity, (entity) => entity.company)
  tradePrice: OrderEntity[];
}
