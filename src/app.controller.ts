import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AppController {

  private message: string[];

  constructor(
    private httpService: HttpService,
    private readonly appService: AppService,
  ) {}

  @Post('/injest')
  injestLog(@Body() body) {
    Logger.log(body);
    this.message.push(body);
  }
  
  @Get('/consume')
  consumer() {
    return this.message;
  }
}
