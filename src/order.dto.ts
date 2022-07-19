enum OrderType {
  buy,
  sell,
}

enum OrderStatus {
  pending,
  partiallyFilled,
  completed,
}

export class ExchangeOrderRequestDTO {
  price: number;
  quantity: number;
  company: number;
  orderTpe: OrderType;
  trades: Array<Trade>;
  orderStatus: OrderStatus;
}
