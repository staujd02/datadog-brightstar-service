import { ServerService } from "src/server/server.service";
import bodyParser from 'body-parser';
import { WebSocketServer } from "src/websocket/websocket.server";

export class HttpServer {

    constructor(
        private readonly expressServer: ServerService,
        private readonly webSocketServer: WebSocketServer,
    ) {}

    public configure() {
        const app = this.expressServer.server;
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
        this.configure();
        this.webSocketServer.listen();
    }
}
