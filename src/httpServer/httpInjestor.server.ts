import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { Emitter } from 'src/emitter/emitter.service';

@Controller("injest")
export class HttpInjestorController {

    constructor(
        private readonly emitter: Emitter
    ){}
    
    @Get()
    handleGet(): string {
        return "You got me!";
    }
    
    @Post()
    handleInjest(
        @Body() data: string,
    ): void {
        Logger.log("Emitting Message to All Clients");
        this.emitter.emit(data);
    }
}