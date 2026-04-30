import { Module } from '@nestjs/common';
import { UserController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { CreateUserHandler } from 'src/modules/users/commands/create-user.command';
import { GetUsersHandler } from 'src/modules/users/queries/get-paged-users.query';

@Module({
  controllers: [UserController],
  providers: [UsersService, CreateUserHandler, GetUsersHandler],
  exports: [UsersService], // <-- así lo puedes usar en AuthModule
})
export class UsersModule {}
