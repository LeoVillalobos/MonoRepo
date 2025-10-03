// src/controllers/employees.controller.ts
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateEmployeeCommand } from '../commands/employees/create-employee.command';
import { GetEmployeesQuery } from '../queries/employees/get-employees.query';
import { CreateEmployeeRequest } from 'src/dtos/request/create-employee.request';
import { EmployeeResponse } from 'src/dtos/response/employee-response';
import { PaginatedResponse } from 'src/dtos/response/base/paginated-response';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BaseController } from './base/base.controller';
import { MediatorService } from 'src/common/services/mediator.service';
import { PrismaOrbisModel } from 'src/database/models/prisma-orbis.model';
import { PrismaOrbisQuery } from 'src/common/decorators/sieve-query.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiBearerAuth() // 🔹 Swagger sabrá que necesita token
@UseGuards(JwtAuthGuard) // 🔹 Protege todos los endpoints de este controller
@Controller('employees')
export class EmployeesController extends BaseController {

   constructor(mediator: MediatorService) {
    super(mediator); // IMPORTANTE: pasar al constructor de la clase base
  }

  // Obtener todos los empleados
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'search', required: false })
  async getAllEmployees(
    @PrismaOrbisQuery() sieve: PrismaOrbisModel,
  ): Promise<PaginatedResponse<EmployeeResponse>> {
    console.log('Received query parameters:', sieve);
    return this.mediator.sendQuery(new GetEmployeesQuery(sieve));
  }

  // Crear un empleado
  @Post()
  async createEmployee(@Body() data: CreateEmployeeRequest) {
    await this.mediator.sendCommand(new CreateEmployeeCommand(data));
  }
}
