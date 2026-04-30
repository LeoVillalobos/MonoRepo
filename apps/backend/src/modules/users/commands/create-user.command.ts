import { CommandHandler } from "@nestjs/cqrs";
import { CreateCommandHandler, ICreateCommand } from "src/infrastructure/cqrs/create-command.handler";
import { MediatorService } from "src/infrastructure/cqrs/mediator.service";
import { User } from "src/infrastructure/database/models/security/user.model";
import { CreateUserRequest } from "src/modules/users/dto/request/create-user.request";
import { UserResponse } from "src/modules/users/dto/response/user.response";
import * as bcrypt from 'bcrypt';

export class CreateUserCommand implements ICreateCommand<CreateUserRequest> {
  constructor(public readonly payload: CreateUserRequest) {}
}


@CommandHandler(CreateUserCommand)
export class CreateUserHandler extends CreateCommandHandler<
  CreateUserRequest,
  UserResponse,
  User
> {

  constructor(mediator: MediatorService) {
    super(mediator, User, UserResponse);
  }

  protected async validate(payload: CreateUserRequest) {
    console.log('Validating CreateUser Request:', payload);
    return Promise.resolve();
  }

  async beforeCreate(entity: User, payload: CreateUserRequest): Promise<void> {
    // Aquí puedes agregar lógica antes de crear el usuario, como hashear la contraseña
    const hashedPassword = await bcrypt.hash(payload.password, 10);
      // Ejemplo: entity.password = hashFunction(payload.password);
      entity.password = hashedPassword; // Reemplaza esto con el hash real

    return Promise.resolve();
  }

}
