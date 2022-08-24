import { Column, Double, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { MasterEntity } from "./master.entity";

@Entity("order")
export class OrderEntity {
    @PrimaryColumn('uuid')
    id: any;
    @Column({type: 'float',})
    price: Double;
    @Column({type: 'float',})
    last_price: Double;
    @Column()
    traded_quantity: number;
    @Column()
    name: string;
    @Column()
    buyer_id: string;
    @Column()
    seller_id: string;
    @PrimaryColumn()
    updated_at: Date;
    @ManyToOne(() => MasterEntity, (masterEntity) => masterEntity.tradePrice)
    company: MasterEntity;
  }