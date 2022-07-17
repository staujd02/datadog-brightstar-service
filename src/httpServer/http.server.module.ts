import { Module } from "@nestjs/common";
import { WebSocketModule } from "src/websocket/websocket.module";

@Module({
  imports: [WebSocketModule],
  controllers: [HttpServerModule],
})
export class HttpServerModule {}