import { QueryHandler } from '@nestjs/cqrs';
import { GetEmployeesQuery } from '../get-employees.query';
import { Employee } from 'src/database/models/employee.model';
import { EmployeeResponse } from 'src/dtos/response/employee-response';
import { GetPagedInfoQueryHandler } from 'src/common/cqrs/get-paged-info-query.handler';
import { GetPagedInfoQuery } from 'src/queries/get-paged-info.query';

@QueryHandler(GetEmployeesQuery)
export class GetEmployeesHandler extends GetPagedInfoQueryHandler<
  GetPagedInfoQuery,
  Employee,
  EmployeeResponse
> {

  protected allowedSortFields: Set<string> = new Set([
    'nombre',
    'apellido_paterno',
    'apellido_materno',
    'created_at',
    'estatus'
  ]);

  constructor() {
    super(EmployeeResponse); // <-- PASAMOS el DTO aquí
  }

  protected getEntity() {
    return Employee;
  }
}
