import { Module } from "@nestjs/common";
import { HttpInjestorController } from "./httpInjestor.server";

@Module({
  providers: [HttpInjestorController],
  exports: [HttpInjestorController],
})
export class HttpInjestorModule {}