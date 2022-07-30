import { Module } from "@nestjs/common";
import { EmitterModule } from "src/emitter/emitter.module";
import { HttpInjestorController } from "./httpInjestor.server";

@Module({
  imports: [EmitterModule],
  providers: [HttpInjestorController],
  exports: [HttpInjestorController],
})
export class HttpInjestorModule {}