import { Global, Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MediatorService } from "src/infrastructure/cqrs/mediator.service";

@Global()
@Module({
  imports: [CqrsModule],
  providers: [MediatorService],
  exports: [MediatorService], // IMPORTANTE: exportarlo
})

export class MediatorModule {}
