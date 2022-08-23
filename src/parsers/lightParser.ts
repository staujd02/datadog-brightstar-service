import { Injectable } from '@nestjs/common';
import { AlertUpdate } from '../emitter/emitter.service';

@Injectable()
export class LightParser {

    private readonly monitorBucket = new Map<string, AlertUpdate>();

    constructor() { }

    public parseMessage(message: AlertUpdate): string | null {
        if (message.alert_type == "error")
            this.monitorBucket.set(message.id, message);
        else if (message.alert_type == "success")
            this.monitorBucket.delete(message.id)
        return this.processAllBuckets(message, this.monitorBucket);
    }

    private processAllBuckets(message: AlertUpdate, monitorBucket: Map<string, AlertUpdate>): string {
        if (monitorBucket.size)
            return [...Color.Red, Mode.Solid, 0].join(',');
        return [...Color.Green, Mode.Solid, 0].join(',');
    }
}

export enum Mode {
    Flash = "FLASH",
    Solid = "SOLID"
}

const Color = {
    Red: [255, 0, 0],
    Green: [0, 255, 0]
}