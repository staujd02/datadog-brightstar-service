import { Module } from "@nestjs/common";
import { ParserModule } from "src/parsers/emitter.module";
import { LightParser } from "src/parsers/lightParser";
import { WebSocketModule } from "src/websocket/websocket.module";
import { Emitter } from "./emitter.service";

@Module({
  imports: [WebSocketModule, ParserModule],
  providers: [Emitter],
  exports: [Emitter],
})
export class EmitterModule {}