import { QueryHandler } from '@nestjs/cqrs';
import { GetPagedInfoQuery } from '../get-paged-info.query';
import { PrismaOrbisModel } from 'src/database/models/prisma-orbis.model';
import { GetPagedInfoQueryHandler } from 'src/common/cqrs/get-paged-info-query.handler';
import { Role } from 'src/database/models/security/role.model';
import { RoleResponse } from 'src/dtos/response/roles/role-response';

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
