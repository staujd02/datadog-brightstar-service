import { ServerService } from "src/server/server.service";
import * as bodyParser from 'body-parser';
import { WebSocketServer } from "src/websocket/websocket.server";
import { Injectable } from "@nestjs/common";
import e from "express";

@Injectable()
export class HttpServer {

    constructor(
        private readonly expressServer: ServerService,
        private readonly webSocketServer: WebSocketServer,
    ) {}

    public configure(app: e.Express) {
        app.use(bodyParser.json());
        app.get('/health', function(req, res) {
            console.log('Health Checked');
            res.sendStatus(200);
            res.end();
        });
        app.post('/injest', function(req, res) {
            let message = req.body.message;
            console.log('Regular POST message: ', message);
            this.webSocketServer.injectAlertMessage(message);
            return res.sendStatus(200);
        });
    }

    public startListening(){
        // const app = this.expressServer.server;
        // this.configure(app);
        this.webSocketServer.listen();
    }
}
