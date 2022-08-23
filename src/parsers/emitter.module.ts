import { Module } from "@nestjs/common";
import { WebSocketModule } from "src/websocket/websocket.module";
import { LightParser } from "./lightParser";

@Module({
  imports: [],
  providers: [LightParser],
  exports: [LightParser],
})
export class ParserModule {}