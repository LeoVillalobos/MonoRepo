import { Module } from '@nestjs/common';
import { UsersService } from '../../services/users.service';
import { CreateUserHandler } from 'src/commands/users/create-user.command';
import { GetUsersHandler } from 'src/queries/users/get-paged-users.query';

@Module({
  providers: [UsersService, CreateUserHandler, GetUsersHandler],
  exports: [UsersService], // <-- así lo puedes usar en AuthModule
})
export class UsersModule {}
