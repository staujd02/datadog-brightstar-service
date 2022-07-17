import {
    Controller,
    OnModuleInit,
} from '@nestjs/common';
import { Express } from 'express';
import * as express from 'express';

@Controller()
export class ServerService implements OnModuleInit {

    public server: Express;

    constructor() { }

    onModuleInit() {
        this.server = express();
    }
}
