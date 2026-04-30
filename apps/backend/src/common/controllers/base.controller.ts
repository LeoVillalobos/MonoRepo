// import { Injectable } from "@nestjs/common";
import { MediatorService } from "src/infrastructure/cqrs/mediator.service";

// @Injectable()
export abstract class BaseController {
  constructor(protected readonly mediator: MediatorService) {}
}
