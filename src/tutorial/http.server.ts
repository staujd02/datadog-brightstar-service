import * as express from 'express';
import { Express } from 'express';
import bodyParser from 'body-parser';

export class HttpServer {

    public app: Express; 

    constructor(){
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.get('/health', function(req, res) {
            console.log('Health Checked');
            return res.sendStatus(200);
        });
        this.app.post('/injest', function(req, res) {
            let message = req.body.message;
            console.log('Regular POST message: ', message);
            return res.sendStatus(200);
        });
    }
}
