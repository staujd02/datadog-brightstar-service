import { Module } from "@nestjs/common";
import { LogSocketServer } from "./websocket.server";

@Module({
  providers: [LogSocketServer],
  exports: [LogSocketServer],
})
export class WebSocketModule {}