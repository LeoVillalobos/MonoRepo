import { MediatorService } from "src/infrastructure/cqrs/mediator.service";
import { BaseController } from "src/common/controllers/base.controller";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger/dist/decorators/api-query.decorator";
import { PrismaOrbisQuery } from "src/common/decorators/sieve-query.decorator";
import { PaginatedResponse } from "src/common/dto/response/base/paginated-response";
import { PrismaOrbisModel } from "src/infrastructure/database/models/prisma-orbis.model";
import { UserResponse } from "src/modules/users/dto/response/user.response";
import { GetUsersQuery } from "src/modules/users/queries/get-paged-users.query";
import { CreateUserCommand } from "src/modules/users/commands/create-user.command";
import { CreateUserRequest } from "src/modules/users/dto/request/create-user.request";

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
