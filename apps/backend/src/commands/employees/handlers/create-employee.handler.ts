// src/modules/employees/commands/create-employee.handler.ts
import { CommandHandler } from '@nestjs/cqrs';
import { Employee } from 'src/database/models/employee.model';
import { MediatorService } from 'src/common/services/mediator.service';
import { CreateEmployeeCommand } from '../create-employee.command';
import { CreateCommandHandler } from 'src/common/cqrs/create-command.handler';
import { EmployeeResponse } from 'src/dtos/response/employee-response';
import { CreateEmployeeRequest } from 'src/dtos/request/create-employee.request';

@CommandHandler(CreateEmployeeCommand)
export class CreateEmployeeHandler extends CreateCommandHandler<
  CreateEmployeeRequest,
  EmployeeResponse,
  Employee
> {

  constructor(mediator: MediatorService) {
    super(mediator, Employee, EmployeeResponse);
  }

  /** Validación antes de crear la entidad */
  protected async validate(payload: CreateEmployeeRequest) {
    console.log('Validating CreateEmployeeRequest:', payload);

    return Promise.resolve();
  }

}
