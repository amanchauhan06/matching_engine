import { Injectable } from '@nestjs/common';
import { ExchangeOrderRequestDTO } from './order.dto';

@Injectable()
export class AppService {
  buyOrderRequest: Array<ExchangeOrderRequestDTO>;
  sellOrderRequest: Array<ExchangeOrderRequestDTO>;
  completedORderRequest: Array<ExchangeOrderRequestDTO>;
  lastTradedPrice: number = 10.0;
  isMatchingEngineActive: boolean = false;
  getHello(): string {
    return 'Hello World!';
  }

  startTrading(data: string) {
    console.log('Start Trading, data: ' + data);
    for (var i = 0; i < 25; i++) {
      let price: number = parseInt((Math.random() * 10).toFixed(2));
      // quantity:number = Random().nextInt(8) + 1;
      // await Future.delayed(const Duration(seconds: 1));
      // if (i.isOdd) {
      //   engine.addOrder(Order(
      //       type: OrderType.buy,
      //       price: price.floorToDouble(),
      //       trades: [],
      //       quantity: quantity,
      //       orderStatus: OrderStatus.pending));
      // }
      // if (i.isEven) {
      //   engine.addOrder(Order(
      //       type: OrderType.sell,
      //       price: price.floorToDouble(),
      //       trades: [],
      //       quantity: quantity,
      //       orderStatus: OrderStatus.pending));
      // }
    }
  }

  // addOrder(Order order) {
  //   if (order.type == OrderType.buy) {
  //     int index =
  //         buyOrderRequests.indexWhere((element) => element.price < order.price);
  //     if (index < 0) {
  //       buyOrderRequests.add(order);
  //     } else {
  //       buyOrderRequests.insert(index, order);
  //     }
  //   } else {
  //     int index = sellOrderRequests
  //         .indexWhere((element) => element.price > order.price);
  //     if (index < 0) {
  //       sellOrderRequests.add(order);
  //     } else {
  //       sellOrderRequests.insert(index, order);
  //     }
  //   }
  //   if (!isMatchingEngineActive) {
  //     _matchingEngine();
  //   }
  // }
}
