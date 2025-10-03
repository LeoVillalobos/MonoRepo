import { PrismaOrbisModel } from "src/database/models/prisma-orbis.model";
import { GetPagedInfoQuery } from "../get-paged-info.query";
import { UserResponse } from "src/dtos/response/users/user.response";
import { User } from "src/database/models/security/user.model";
import { QueryHandler } from "@nestjs/cqrs/dist/decorators/query-handler.decorator";
import { GetPagedInfoQueryHandler } from "src/common/cqrs/get-paged-info-query.handler";

export class GetUsersQuery extends GetPagedInfoQuery {
  constructor(info: PrismaOrbisModel) {
    super(info);
  }
}

@QueryHandler(GetUsersQuery)
export class GetUsersHandler extends GetPagedInfoQueryHandler<
  GetPagedInfoQuery,
  User,
  UserResponse
> {

  protected allowedSortFields: Set<string> = new Set([
    'nombre',
    'apellido_paterno',
    'apellido_materno',
    'created_at',
    'estatus'
  ]);

  constructor() {
    super(UserResponse); // <-- PASAMOS el DTO aquí
  }

  protected getEntity() {
    return User;
  }
}
