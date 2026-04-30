// src/modules/application.module.ts
import { Module } from '@nestjs/common';
import { MediatorModule } from 'src/infrastructure/cqrs/mediator.module';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
// 👉 aquí irás agregando tus módulos de negocio

@Module({
  imports: [
    DatabaseModule,
    MediatorModule,
    EmployeesModule,
    AuthModule,
    UsersModule,
    RolesModule,
    // UsersModule,
    // OrdersModule,
  ],
  exports: [
    DatabaseModule,
    MediatorModule,
    EmployeesModule,
    AuthModule,
    UsersModule,
    RolesModule,
    // OrdersModule,
  ],
})
export class ApplicationModule {}
