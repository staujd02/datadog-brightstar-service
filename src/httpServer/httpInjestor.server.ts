import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AlertUpdate, Emitter } from 'src/emitter/emitter.service';

@Controller("injest")
export class HttpInjestorController {

    constructor(
        private readonly emitter: Emitter
    ){}
    
    @Post()
    handleInjest(
        @Body() data: AlertUpdate,
    ): void {
        Logger.log("Emitting Message to All Clients");
        this.emitter.emit(data);
    }
}