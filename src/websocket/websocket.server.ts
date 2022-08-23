import { Server, Socket } from 'socket.io';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class LogSocketServer {
    
    @WebSocketServer()
    private server: Server;

    public emitLog(message: any){
        this.server.emit("log", message);
    }
    
    public emitLightStatusToAllClients(message: string){
        // "255,255,255 MODE TIMEOUT";
        this.server.emit("light", message);
    }

    @SubscribeMessage('connection')
    handleConnectedEvent(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): void {
        console.log("client connected");
    }
}