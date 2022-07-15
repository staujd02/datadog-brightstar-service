import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { TeapotException } from './exceptions/teapot.exception';
import { MessageConstants } from './message-constants';

describe('The application service', () => {
  let service: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: 'LOGGING_METHOD',
          useValue: {},
        },
        {
          provide: ConfigService,
          useValue: {},
        },
      ],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('when the user interacts with the teapot', () => {
    describe('and the user tries to brew coffee', () => {
      it('should return an error', async () => {
        await expect(service.handleTeaRequest('coffee')).rejects.toThrowError(
          new TeapotException(MessageConstants.TeapotCoffeeExceptionMessage(), [
            { problemBeverage: 'coffee' },
          ]),
        );
      });
    });
    describe('and the user tries to brew tea', () => {
      it('should brew the user some tea', async () => {
        const result = await service.handleTeaRequest('tea');
        expect(result).toEqual(MessageConstants.GiveTeaMessage());
      });
    });
    describe('and the user tries to brew anything else', () => {
      it('lets the user know it is confused', async () => {
        const result = await service.handleTeaRequest('monster energy drink');
        expect(result).toEqual(MessageConstants.MysteryBeverageMessage());
      });
    });
  });
});
