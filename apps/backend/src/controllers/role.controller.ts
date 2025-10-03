import { MediatorService } from "src/common/services/mediator.service";
import { BaseController } from "./base/base.controller";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateRoleCommand } from "src/commands/roles/create-role.command";
import { CreateRoleRequest } from "src/dtos/request/roles/create-role.request";
import { ApiQuery } from "@nestjs/swagger/dist/decorators/api-query.decorator";
import { PrismaOrbisQuery } from "src/common/decorators/sieve-query.decorator";
import { PaginatedResponse } from "src/dtos/response/base/paginated-response";
import { RoleResponse } from "src/dtos/response/roles/role-response";
import { PrismaOrbisModel } from "src/database/models/prisma-orbis.model";
import { GetRolesQuery } from "src/queries/roles/get-paged-roles.query";

@Controller('roles')
export class RoleController extends BaseController{
  constructor(mediator: MediatorService) {
    super(mediator);
  }

    // Obtener todos los roles
    @Get()
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'pageSize', required: false })
    @ApiQuery({ name: 'sort', required: false })
    @ApiQuery({ name: 'search', required: false })
    async getAllRoles(
      @PrismaOrbisQuery() sieve: PrismaOrbisModel,
    ): Promise<PaginatedResponse<RoleResponse>> {
      console.log('Received query parameters:', sieve);
      return this.mediator.sendQuery(new GetRolesQuery(sieve));
    }

  // Crear un rol
    @Post()
    async createRole(@Body() data: CreateRoleRequest) {
      await this.mediator.sendCommand(new CreateRoleCommand(data));
    }
}
