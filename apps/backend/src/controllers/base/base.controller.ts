// import { Injectable } from "@nestjs/common";
import { MediatorService } from "src/common/services/mediator.service";

// @Injectable()
export abstract class BaseController {
  constructor(protected readonly mediator: MediatorService) {}
}
