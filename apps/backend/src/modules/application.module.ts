// src/modules/application.module.ts
import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees.module';
import { AuthModule } from './security/auth.module';
import { UsersModule } from './security/users.module';
import { RolesModule } from './security/roles.module';
// 👉 aquí irás agregando tus módulos de negocio

@Module({
  imports: [
    EmployeesModule,
    AuthModule,
    UsersModule,
    RolesModule,
    // UsersModule,
    // OrdersModule,
  ],
  exports: [
    EmployeesModule,
    AuthModule,
    UsersModule,
    RolesModule,
    // OrdersModule,
  ],
})
export class ApplicationModule {}
