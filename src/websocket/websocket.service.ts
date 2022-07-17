import { Server as SocketIOServer } from 'socket.io';
import { createServer, Server as HttpServer } from 'http';
import { OnModuleInit } from '@nestjs/common';
import { ServerService } from 'src/server/server.service';
import { MessageEventType } from './websockets.enums';

export class WebSocketServer implements OnModuleInit {

    private server: HttpServer;
    private wss: SocketIOServer ;

    constructor(
        private readonly expressServer: ServerService
    ) {
        this.server = createServer();
        this.wss = new SocketIOServer(this.server);
    }

    public injectAlertMessage(message: any){
        this.wss.emit(MessageEventType.Alert, message);
    }

    onModuleInit() {
        const app = this.expressServer.server;
        this.server.on('request', app);
        this.wss.on('connection', function connection(ws) {
            console.log(`client connected: ${ws.id}`);
            ws.on('message', function incoming(message) {
                console.log(`received: ${message}`);
                ws.send(JSON.stringify({
                    answer: 42
                }));
            });
            ws.on('disconnected', function incoming() {
                console.log(`client disconnected: ${ws.id}`);
            });
        });

        const PORT = process.env.PORT || 8080;

        this.server.listen(PORT, function() {
            console.log(`http/ws server listening on ${PORT}`);
        });
    }
}