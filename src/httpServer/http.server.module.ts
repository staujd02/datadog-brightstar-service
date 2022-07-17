import { Module } from "@nestjs/common";
import { ServerModule } from "src/server/server.module";
import { WebSocketModule } from "src/websocket/websocket.module";
import { HttpServer } from "./http.server";

@Module({
  imports: [WebSocketModule, ServerModule],
  providers: [HttpServer],
  exports: [HttpServer]
})
export class HttpServerModule {}