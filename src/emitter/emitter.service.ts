import { Injectable } from '@nestjs/common';
import { LightParser } from '../parsers/lightParser';
import { LogSocketServer } from '../websocket/websocket.server';

export interface AlertUpdate {
    title: string,
    alert_type: string,
    transition: string,
    priority: string,
    last_updated: string,
    event_title: string,
    date: string,
    id: string,
}

@Injectable()
export class Emitter {

    constructor(
        private readonly webSockerServer: LogSocketServer,
        private readonly lightParser: LightParser,
    ){}

    public emit(message: AlertUpdate): void{
        this.webSockerServer.emitLog(message);
        this.webSockerServer.emitLightStatusToAllClients(
            this.lightParser.parseMessage(message)
        );
    }
    
}