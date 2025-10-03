// src/commands/roles/handlers/create-role.handler.ts
import { CommandHandler } from '@nestjs/cqrs';
import { CreateCommandHandler, ICreateCommand } from 'src/common/cqrs/create-command.handler';
import { MediatorService } from 'src/common/services/mediator.service';
import { Role } from 'src/database/models/security/role.model';
import { CreateRoleRequest } from 'src/dtos/request/roles/create-role.request';
import { RoleResponse } from 'src/dtos/response/roles/role-response';

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
