// src/modules/employees/commands/create-employee.command.ts

import { ICreateCommand } from 'src/infrastructure/cqrs/create-command.handler';
import { CreateEmployeeRequest } from 'src/modules/employees/dto/request/create-employee.request';

export class CreateEmployeeCommand implements ICreateCommand<CreateEmployeeRequest> {
  constructor(public readonly payload: CreateEmployeeRequest) {}
}
