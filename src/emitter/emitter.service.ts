import { Injectable } from '@nestjs/common';
import { LogSocketServer } from 'src/websocket/websocket.server';

@Injectable()
export class Emitter {

    constructor(
        private readonly webSockerServer: LogSocketServer
    ){}

    public emit(message: any): void{
        this.webSockerServer.emitToAllClients(message);
    }
    
}