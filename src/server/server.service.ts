import { Controller } from '@nestjs/common';
import { Express } from 'express';
import * as express from 'express';

@Controller()
export class ServerService {

    public server: Express;

    constructor() {
        this.server = express();
     }
}
