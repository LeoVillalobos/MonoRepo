import { QueryHandler } from '@nestjs/cqrs';
import { GetPagedInfoQuery } from 'src/infrastructure/cqrs/get-paged-info.query';
import { PrismaOrbisModel } from 'src/infrastructure/database/models/prisma-orbis.model';
import { GetPagedInfoQueryHandler } from 'src/infrastructure/cqrs/get-paged-info-query.handler';
import { Role } from 'src/infrastructure/database/models/security/role.model';
import { RoleResponse } from 'src/modules/roles/dto/response/role-response';

export class GetRolesQuery extends GetPagedInfoQuery {
  constructor(info: PrismaOrbisModel) {
    super(info);
  }
}


@QueryHandler(GetRolesQuery)
export class GetRolesHandler extends GetPagedInfoQueryHandler<
  GetPagedInfoQuery,
  Role,
  RoleResponse
> {

  protected allowedSortFields: Set<string> = new Set([
    'nombre',
    'apellido_paterno',
    'apellido_materno',
    'created_at',
    'estatus'
  ]);

  constructor() {
    super(RoleResponse); // <-- PASAMOS el DTO aquí
  }

  protected getEntity() {
    return Role;
  }
}
