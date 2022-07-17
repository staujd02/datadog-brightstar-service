import { OnModuleInit } from "@nestjs/common";
import { ServerService } from "src/server/server.service";
import bodyParser from 'body-parser';
import { WebSocketServer } from "src/websocket/websocket.service";

export class HttpServer implements OnModuleInit {

    constructor(
        private readonly expressServer: ServerService,
        private readonly webSocketServer: WebSocketServer,
    ) {}

    onModuleInit() {
        const app = this.expressServer.server;
        app.use(bodyParser.json());
        app.get('/health', function(req, res) {
            console.log('Health Checked');
            return res.sendStatus(200);
        });
        app.post('/injest', function(req, res) {
            let message = req.body.message;
            console.log('Regular POST message: ', message);
            this.webSocketServer.injectAlertMessage(message);
            return res.sendStatus(200);
        });
    }
}
