import {
    Logger,
    Controller,
    Post,
    Body,
} from '@nestjs/common';
import { WebSocketService } from 'src/websocket/websocket.service';
import { MessageEventType } from 'src/websocket/websockets.enums';

@Controller()
export class HttpServerService {

    constructor(
        private readonly server: WebSocketService,
    ) {}

    @Post('/injest')
    injestLog(@Body() body) {
        Logger.log("Injested new message");
        this.server.postEvent(MessageEventType.Alert, body);
    }
}
