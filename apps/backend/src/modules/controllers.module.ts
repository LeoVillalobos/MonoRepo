// src/modules/controllers.module.ts
import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from './database.module';
import { MediatorModule } from './mediator.module';

// Controllers
import { EmployeesController } from '../controllers/employees.controller';
import { RoleController } from 'src/controllers/role.controller';
import { UserController } from 'src/controllers/users.controller';
import { AuthController } from 'src/controllers/auth.controller';

@Global()
@Module({
  imports: [CqrsModule, DatabaseModule, MediatorModule],
  controllers: [EmployeesController, RoleController, UserController, AuthController],
})

export class ControllersModule {}
