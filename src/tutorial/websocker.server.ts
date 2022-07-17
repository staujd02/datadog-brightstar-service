import { Server } from 'socket.io';
import { createServer } from 'http';
import { HttpServer } from './http.server';

// let WSServer = require('ws').Server;
// let app = require('./http-server');

export class WebSocketServer {

    constructor() {
        const app = new HttpServer().app;
        const server = createServer();
        const wss = new Server(server);

        // Also mount the app here
        server.on('request', app);
        wss.on('connection', function connection(ws) {
            ws.on('message', function incoming(message) {
                console.log(`received: ${message}`);
                ws.send(JSON.stringify({
                    answer: 42
                }));
            });
        });

        server.listen(process.env.PORT || 8080, function() {
            console.log(`http/ws server listening on ${process.env.PORT}`);
        });
    }
}