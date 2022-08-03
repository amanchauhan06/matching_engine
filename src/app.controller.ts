import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { OrderRepository } from './order.repository';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly appRepo: OrderRepository,
  ) {}
  @MessagePattern('startTrading')
  handleStartTrading(data: string) {
    console.log('I am here');
    return this.appService.startTrading(data);
  }
}
