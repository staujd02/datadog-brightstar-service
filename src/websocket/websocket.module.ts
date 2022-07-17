import { Module } from "@nestjs/common";
import { ServerModule } from "src/server/server.module";
import { WebSocketServer } from "./websocket.server";

@Module({
  imports: [ServerModule],
  providers: [WebSocketServer],
  exports: [WebSocketServer],
})
export class WebSocketModule {}