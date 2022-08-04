import { ParseUUIDPipe } from "@nestjs/common";

export class OrderModel {
    id: any;
    price: number;
    last_price: number;
    traded_quantity: number;
    name: string;
    buyer_id: string;
    seller_id: string;
    updated_at: string;
  }