// src/modules/employees/commands/create-employee.handler.ts
import { CommandHandler } from '@nestjs/cqrs';
import { Employee } from 'src/infrastructure/database/models/employee.model';
import { MediatorService } from 'src/infrastructure/cqrs/mediator.service';
import { CreateEmployeeCommand } from '../create-employee.command';
import { CreateCommandHandler } from 'src/infrastructure/cqrs/create-command.handler';
import { EmployeeResponse } from 'src/modules/employees/dto/response/employee-response';
import { CreateEmployeeRequest } from 'src/modules/employees/dto/request/create-employee.request';

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
