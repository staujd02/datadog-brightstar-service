import { Module } from "@nestjs/common";
import { LightParser } from "./lightParser";

@Module({
  imports: [],
  providers: [LightParser],
  exports: [LightParser],
})
export class ParserModule {}