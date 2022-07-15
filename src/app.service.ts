import { Injectable } from '@nestjs/common';
import { MessageConstants } from './message-constants';

@Injectable()
export class AppService {
  async handleTeaRequest(beverage: string): Promise<string> {
    if (beverage.toLowerCase() == 'tea')
      return MessageConstants.GiveTeaMessage();
    else if (beverage.toLowerCase() == 'coffee') {
      throw new Error(
        MessageConstants.TeapotCoffeeExceptionMessage()
      );
    }
    return MessageConstants.MysteryBeverageMessage();
  }
}
