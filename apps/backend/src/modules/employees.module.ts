// src/employees/employees.module.ts
import { Module } from '@nestjs/common';
// import { EmployeesService } from '../services/employees.service';

// Handlerss
import { CreateEmployeeHandler } from '../commands/employees/handlers/create-employee.handler';
import { GetEmployeesHandler } from 'src/queries/employees/handlers/get-employees.handler';

@Module({
  providers: [GetEmployeesHandler, CreateEmployeeHandler],
  exports: [], // si otros módulos necesitan usar el service
})
export class EmployeesModule {}
