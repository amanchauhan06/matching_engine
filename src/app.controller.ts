import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('startTrading')
  handleStartTrading(data: string) {
    console.log('I am here');
    return this.appService.startTrading(data);
  }
}
