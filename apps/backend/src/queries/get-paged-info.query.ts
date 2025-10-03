
import { IQuery } from "@nestjs/cqrs";
import { PrismaOrbisModel } from "src/database/models/prisma-orbis.model";


export class GetPagedInfoQuery implements IQuery {
  constructor(public readonly info: PrismaOrbisModel) {}
}
