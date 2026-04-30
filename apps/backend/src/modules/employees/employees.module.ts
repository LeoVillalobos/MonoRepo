// src/employees/employees.module.ts
import { Module } from '@nestjs/common';
// import { EmployeesService } from '../services/employees.service';
import { EmployeesController } from './controllers/employees.controller';

// Handlerss
import { CreateEmployeeHandler } from './commands/handlers/create-employee.handler';
import { GetEmployeesHandler } from 'src/modules/employees/queries/handlers/get-employees.handler';

@Module({
  controllers: [EmployeesController],
  providers: [GetEmployeesHandler, CreateEmployeeHandler],
  exports: [], // si otros módulos necesitan usar el service
})
export class EmployeesModule {}
