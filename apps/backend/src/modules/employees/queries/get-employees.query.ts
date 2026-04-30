
import { GetPagedInfoQuery } from 'src/infrastructure/cqrs/get-paged-info.query';
import { PrismaOrbisModel } from 'src/infrastructure/database/models/prisma-orbis.model';

export class GetEmployeesQuery extends GetPagedInfoQuery {
  constructor(info: PrismaOrbisModel) {
    super(info);
  }
}
