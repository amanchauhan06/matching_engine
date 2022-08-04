import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import Redis from 'ioredis';
import { ExchangeOrderRequestDTO, OrderStatus, OrderType } from './order.dto';
import { OrderModel } from './order.model';
import { OrderRepository } from './order.repository';
import { Trade } from './trade.dto';

enum CompleteOrderType {
  equal,
  buyMore,
  sellMore,
}
@Injectable()
export class AppService {
  constructor(private readonly orderRepo: OrderRepository) {}
  @Inject('REDIS_CLIENT') private readonly redis: Redis;
  buyOrderRequest: Array<ExchangeOrderRequestDTO> = [];
  sellOrderRequest: Array<ExchangeOrderRequestDTO> = [];
  completedORderRequest: Array<ExchangeOrderRequestDTO> = [];
  lastTradedPrice: number = 10.0;
  isMatchingEngineActive: boolean = false;
  getHello(): string {
    return 'Hello World!';
  }

  async startTrading(data: string) {
    console.log('Start Trading, data: ' + data);
    for (var i = 0; i < 25; i++) {
      let price: number = parseFloat((639 + Math.random() * 2).toFixed(2));
      let quantity: number = parseInt((Math.random() * 5 + 10).toFixed(2));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (i % 2 !== 0) {
        this.addOrder(
          new ExchangeOrderRequestDTO(
            price,
            quantity,
            0,
            'IRCTC',
            randomUUID(),
            OrderType.buy,
            [],
            OrderStatus.pending,
          ),
        );
      }
      if (i % 2 === 0) {
        this.addOrder(
          new ExchangeOrderRequestDTO(
            price,
            quantity,
            0,
            'IRCTC',
            randomUUID(),
            OrderType.sell,
            [],
            OrderStatus.pending,
          ),
        );
      }
    }
    return this.lastTradedPrice;
  }

  addOrder(order: ExchangeOrderRequestDTO) {
    if (order.orderTpe == OrderType.buy) {
      let index: number = this.buyOrderRequest.findIndex(
        (element) => element.price < order.price,
      );
      if (index < 0) {
        this.buyOrderRequest.push(order);
      } else {
        this.buyOrderRequest.splice(index, 0, order);
      }
    } else {
      let index: number = this.sellOrderRequest.findIndex(
        (element) => element.price > order.price,
      );
      if (index < 0) {
        this.sellOrderRequest.push(order);
      } else {
        this.sellOrderRequest.splice(index, 0, order);
      }
    }
    if (!this.isMatchingEngineActive) {
      this.matchingEngine();
    }
  }

  private async matchingEngine() {
    this.isMatchingEngineActive = true;
    let i: number = 0;
    while (i < this.buyOrderRequest.length) {
      let incrementNeeded: boolean = true;
      for (var j = 0; j < this.sellOrderRequest.length; j++) {
        const leftOverBuyQuantity: number =
          this.buyOrderRequest[i].quantity -
          this.buyOrderRequest[i].tradedQuantity;
        const leftOverSellQuantity =
          this.sellOrderRequest[j].quantity -
          this.sellOrderRequest[j].tradedQuantity;
        if (this.buyOrderRequest[i].price >= this.sellOrderRequest[j].price) {
          if (leftOverBuyQuantity == leftOverSellQuantity) {
            this.buyOrderRequest[i].orderStatus = OrderStatus.completed;
            this.sellOrderRequest[j].orderStatus = OrderStatus.completed;
            this.saveAndPublishOrder(
              this.sellOrderRequest[j],
              this.buyOrderRequest[i],
              CompleteOrderType.equal,
            );
            this.buyOrderRequest[i].tradedQuantity += leftOverSellQuantity;
            this.sellOrderRequest[i].tradedQuantity += leftOverSellQuantity;
            this.lastTradedPrice = this.sellOrderRequest[j].price;
            this.buyOrderRequest[i].trades.push(
              new Trade(leftOverSellQuantity, this.lastTradedPrice),
            );
            this.sellOrderRequest[j].trades.push(
              new Trade(leftOverSellQuantity, this.lastTradedPrice),
            );
            this.completedORderRequest.push(
              ...[this.buyOrderRequest[i], this.sellOrderRequest[j]],
            );
            this.buyOrderRequest.splice(i, 1);
            this.sellOrderRequest.splice(j, 1);
            incrementNeeded = false;
            break;
          } else if (leftOverBuyQuantity > leftOverSellQuantity) {
            this.buyOrderRequest[i].orderStatus = OrderStatus.partiallyFilled;
            this.sellOrderRequest[j].orderStatus = OrderStatus.completed;
            this.saveAndPublishOrder(
              this.sellOrderRequest[j],
              this.buyOrderRequest[i],
              CompleteOrderType.buyMore,
            );
            this.buyOrderRequest[i].tradedQuantity += leftOverSellQuantity;
            this.sellOrderRequest[j].tradedQuantity += leftOverSellQuantity;
            this.lastTradedPrice = this.sellOrderRequest[j].price;
            this.buyOrderRequest[i].trades.push(
              new Trade(leftOverSellQuantity, this.lastTradedPrice),
            );
            this.sellOrderRequest[j].trades.push(
              new Trade(leftOverSellQuantity, this.lastTradedPrice),
            );
            this.completedORderRequest.push(...[this.sellOrderRequest[j]]);
            this.sellOrderRequest.splice(j, 1);
            incrementNeeded = false;
          } else if (leftOverBuyQuantity < leftOverSellQuantity) {
            this.buyOrderRequest[i].orderStatus = OrderStatus.completed;
            this.sellOrderRequest[j].orderStatus = OrderStatus.partiallyFilled;
            this.saveAndPublishOrder(
              this.sellOrderRequest[j],
              this.buyOrderRequest[i],
              CompleteOrderType.sellMore,
            );
            this.buyOrderRequest[i].tradedQuantity += leftOverBuyQuantity;
            this.sellOrderRequest[j].tradedQuantity += leftOverBuyQuantity;
            this.lastTradedPrice = this.sellOrderRequest[j].price;
            this.buyOrderRequest[i].trades.push(
              new Trade(leftOverBuyQuantity, this.lastTradedPrice),
            );
            this.sellOrderRequest[j].trades.push(
              new Trade(leftOverBuyQuantity, this.lastTradedPrice),
            );
            this.completedORderRequest.push(...[this.buyOrderRequest[i]]);
            this.buyOrderRequest.splice(i, 1);
            incrementNeeded = true;
            break;
          }
        }
      }
      if (incrementNeeded) i++;
    }
    this.isMatchingEngineActive = false;
  }

  saveAndPublishOrder(
    sellOrderRequest: ExchangeOrderRequestDTO,
    buyOrderRequest: ExchangeOrderRequestDTO,
    type: CompleteOrderType,
  ) {
    let order = new OrderModel();
    order.id = randomUUID();
    order.last_price = this.lastTradedPrice;
    order.price = sellOrderRequest.price;
    order.name = sellOrderRequest.company;
    order.buyer_id = buyOrderRequest.userId;
    order.seller_id = sellOrderRequest.userId;
    order.updated_at = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
    });
    if (type === CompleteOrderType.equal) {
      order.traded_quantity =
        sellOrderRequest.quantity - sellOrderRequest.tradedQuantity;
    } else if (type === CompleteOrderType.buyMore) {
      order.traded_quantity =
        sellOrderRequest.quantity - sellOrderRequest.tradedQuantity;
    } else {
      order.traded_quantity =
        buyOrderRequest.quantity - buyOrderRequest.tradedQuantity;
    }
    this.redis.publish('trade', JSON.stringify(order));
    this.orderRepo.savePricesToDB(order);
  }
}
