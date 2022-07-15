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

  private messages: string[];

  constructor(
    private httpService: HttpService,
    private readonly appService: AppService,
  ) {
    this.messages = [];
  }

  @Post('/injest')
  injestLog(@Body() body) {
    Logger.log("Injested new message");
    this.messages.push(body);
    Logger.log("New Message Length:", this.messages.length);
  }
  
  @Get('/consume')
  consumer() {
    Logger.log("Requested consumption");
    Logger.log("Message Length:", this.messages.length);
    return this.messages;
  }
}
