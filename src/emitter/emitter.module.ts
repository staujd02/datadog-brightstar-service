import { Module } from "@nestjs/common";
import { WebSocketModule } from "src/websocket/websocket.module";
import { Emitter } from "./emitter.service";

@Module({
  imports: [WebSocketModule],
  providers: [Emitter],
  exports: [Emitter],
})
export class EmitterModule {}