import { Server, Socket } from 'socket.io';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class LogSocketServer {
    
    @WebSocketServer()
    private server: Server;

    public emitToAllClients(message: any){
        this.server.emit("log", message);
    }

    @SubscribeMessage('connection')
    handleConnectedEvent(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): void {
        console.log("client connected");
    }

    @SubscribeMessage('message')
    handleEvent(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): string {
        console.log("echoing data: ", data);
        return Buffer.from(data).toString("utf-8");
    }
}