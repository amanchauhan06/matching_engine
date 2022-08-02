import { ParseUUIDPipe } from "@nestjs/common";

export class OrderModel {
    // id: any;
    price: number;
    last_price: number;
    traded_quantity: number;
    name: string;
    updated_at: string;
  }