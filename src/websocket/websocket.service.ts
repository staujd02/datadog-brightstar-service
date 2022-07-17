import {
    Logger,
    OnModuleInit,
} from '@nestjs/common';
import { ServerService } from 'src/server/server.service';
import { MessageEventType } from './websockets.enums';
import { 
    WebSocketGateway, 
    SubscribeMessage,
} from '@nestjs/websockets'

@WebSocketGateway(parseInt(process.env.PORT || "8080"))
export class WebSocketService implements OnModuleInit {

    constructor(
        private readonly server: ServerService
    ) { }

    onModuleInit() {

        let WSServer = require('ws').Server;
        let server = require('http').createServer();
        let app = require('./http-server');

        // Create web socket server on top of a regular http server
        let wss = new WSServer({
            server: server
        });

        // Also mount the app here
        server.on('request', app);

        wss.on('connection', function connection(ws) {

            ws.on('message', function incoming(message) {

                console.log(`received: ${message}`);

                ws.send(JSON.stringify({

                    answer: 42
                }));
            });
        });
    }

    // private registerConnectionLogger(server: Server) {
    //     server.on('connection', (socket) => {
    //     });
    // }
    @SubscribeMessage('connection')
    public connectionListener(){
        Logger.log('Client connected');
    //         socket.on('disconnect', () => Logger.log('Client disconnected'));
    }

    public broadcastMessage(message: any) {
        // Logger.log("Broadcasting Message");
        // this.server.write(message);
    }

    public postEvent(eventName: MessageEventType, message: any) {
        // Logger.log("Emiting Event: " + eventName);
        // this.server.emit(eventName, message);
    }
}
