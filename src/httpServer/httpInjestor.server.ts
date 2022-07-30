import { Body, Controller, Get, Logger, Post } from '@nestjs/common';

@Controller("injest")
export class HttpInjestorController {
    
    @Get()
    handleGet(): string {
        return "You got me!";
    }
    
    @Post()
    handleInjest(
        @Body() data: string,
    ): void {
        Logger.log(data);
    }
}