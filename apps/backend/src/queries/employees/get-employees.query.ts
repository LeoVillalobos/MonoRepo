
import { GetPagedInfoQuery } from '../get-paged-info.query';
import { PrismaOrbisModel } from 'src/database/models/prisma-orbis.model';

export class GetEmployeesQuery extends GetPagedInfoQuery {
  constructor(info: PrismaOrbisModel) {
    super(info);
  }
}
