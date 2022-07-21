import { Trade } from "./trade.dto";

export enum OrderType {
  buy,
  sell,
}

export enum OrderStatus {
  pending,
  partiallyFilled,
  completed,
}

export class ExchangeOrderRequestDTO {
  price: number;
  quantity: number;
  tradedQuantity: number;
  company: string;
  orderTpe: OrderType;
  trades: Array<Trade>;
  orderStatus: OrderStatus;

  constructor(
    price: number,
    quantity: number,
    tradedQuantity: number,
    company: string,
    orderTpe: OrderType,
    trades: Array<Trade>,
    orderStatus: OrderStatus,
  ) {
    this.price = price;
    this.quantity = quantity;
    this.tradedQuantity = tradedQuantity;
    this.company = company;
    this.orderTpe = orderTpe;
    this.trades = trades;
    this.orderStatus = orderStatus;
  }
}
