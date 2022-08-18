import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { OrderDto } from './stock_order.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}
  @MessagePattern(process.env.STOCK || 'mrf')
  handleStartTrading(@Payload() data: OrderDto) {
    console.log('I am here');
    return  this.appService.startTrading(data);
  }
}
