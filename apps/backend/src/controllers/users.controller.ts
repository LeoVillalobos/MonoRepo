import { MediatorService } from "src/common/services/mediator.service";
import { BaseController } from "./base/base.controller";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger/dist/decorators/api-query.decorator";
import { PrismaOrbisQuery } from "src/common/decorators/sieve-query.decorator";
import { PaginatedResponse } from "src/dtos/response/base/paginated-response";
import { PrismaOrbisModel } from "src/database/models/prisma-orbis.model";
import { UserResponse } from "src/dtos/response/users/user.response";
import { GetUsersQuery } from "src/queries/users/get-paged-users.query";
import { CreateUserCommand } from "src/commands/users/create-user.command";
import { CreateUserRequest } from "src/dtos/request/users/create-user.request";

@Controller('users')
export class UserController extends BaseController{
  constructor(mediator: MediatorService) {
    super(mediator);
  }

    // Obtener todos los roles
    @Get()
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'pageSize', required: false })
    @ApiQuery({ name: 'sort', required: false })
    @ApiQuery({ name: 'search', required: false })
    async getAllUsers(
      @PrismaOrbisQuery() sieve: PrismaOrbisModel,
    ): Promise<PaginatedResponse<UserResponse>> {
      console.log('Received query parameters:', sieve);
      return this.mediator.sendQuery(new GetUsersQuery(sieve));
    }

  // Crear un usuario
    @Post()
    async createUser(@Body() data: CreateUserRequest) {
      await this.mediator.sendCommand(new CreateUserCommand(data));
    }
}
