import { PrismaOrbisModel } from "src/infrastructure/database/models/prisma-orbis.model";
import { GetPagedInfoQuery } from "src/infrastructure/cqrs/get-paged-info.query";
import { UserResponse } from "src/modules/users/dto/response/user.response";
import { User } from "src/infrastructure/database/models/security/user.model";
import { QueryHandler } from "@nestjs/cqrs/dist/decorators/query-handler.decorator";
import { GetPagedInfoQueryHandler } from "src/infrastructure/cqrs/get-paged-info-query.handler";

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
