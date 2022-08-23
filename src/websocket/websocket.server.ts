import { Server, Socket } from 'socket.io';
import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from '@nestjs/websockets';
import { ConfigService } from '@nestjs/config';
import { Constants } from 'src/constants';

@WebSocketGateway()
export class LogSocketServer implements OnGatewayConnection {
    
    constructor(
        private readonly config: ConfigService
    ) {}
    
    @WebSocketServer()
    private server: Server;

    public handleConnection(client: Socket) {
        const value = this.validateRequest(client.handshake.headers.authorization);
        if(!value)
            throw new WsException("Unauthorized");
    }
  
    private validateRequest(authHeader: string): boolean {
        return this.config.get(Constants.AuthToken) === authHeader;
    }

    public emitLog(message: any){
        this.server.emit("log", message);
    }
    
    public emitLightStatusToAllClients(message: string){
        this.server.emit("light", message);
    }

    @SubscribeMessage("connection")
    handleConnectedEvent(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): void {
        console.log("client connected");
    }
}