import { Module } from "@nestjs/common";
import { ParserModule } from "../parsers/emitter.module";
import { WebSocketModule } from "../websocket/websocket.module";
import { Emitter } from "./emitter.service";

@Module({
  imports: [WebSocketModule, ParserModule],
  providers: [Emitter],
  exports: [Emitter],
})
export class EmitterModule {}