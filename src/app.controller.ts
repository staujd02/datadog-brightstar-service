import {
  Body,
  Controller,
  Get,
  Logger,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AppController {
  constructor(
    private httpService: HttpService,
    private readonly appService: AppService,
  ) {}

  @Get('/injest')
  getGuardedHello(@Body() body) {
    Logger.log(body);
  }
}
