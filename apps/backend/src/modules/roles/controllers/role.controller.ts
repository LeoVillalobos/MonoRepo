import { MediatorService } from "src/infrastructure/cqrs/mediator.service";
import { BaseController } from "src/common/controllers/base.controller";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateRoleCommand } from "src/modules/roles/commands/create-role.command";
import { CreateRoleRequest } from "src/modules/roles/dto/request/create-role.request";
import { ApiQuery } from "@nestjs/swagger/dist/decorators/api-query.decorator";
import { PrismaOrbisQuery } from "src/common/decorators/sieve-query.decorator";
import { PaginatedResponse } from "src/common/dto/response/base/paginated-response";
import { RoleResponse } from "src/modules/roles/dto/response/role-response";
import { PrismaOrbisModel } from "src/infrastructure/database/models/prisma-orbis.model";
import { GetRolesQuery } from "src/modules/roles/queries/get-paged-roles.query";

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
