// src/modules/roles/commands/handlers/create-role.handler.ts
import { CommandHandler } from '@nestjs/cqrs';
import { CreateCommandHandler, ICreateCommand } from 'src/infrastructure/cqrs/create-command.handler';
import { MediatorService } from 'src/infrastructure/cqrs/mediator.service';
import { Role } from 'src/infrastructure/database/models/security/role.model';
import { CreateRoleRequest } from 'src/modules/roles/dto/request/create-role.request';
import { RoleResponse } from 'src/modules/roles/dto/response/role-response';

export class CreateRoleCommand implements ICreateCommand<CreateRoleRequest> {
  constructor(public readonly payload: CreateRoleRequest) {}
}


@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler extends CreateCommandHandler<
  CreateRoleRequest,
  RoleResponse,
  Role
> {

  constructor(mediator: MediatorService) {
    super(mediator, Role, RoleResponse);
  }

  protected async validate(payload: CreateRoleRequest) {
    console.log('Validating CreateRole  Request:', payload);
    return Promise.resolve();
  }

}
