import { Module } from '@nestjs/common';
import { RoleController } from './controllers/role.controller';
import { CreateRoleHandler } from 'src/modules/roles/commands/create-role.command';
import { GetRolesHandler } from 'src/modules/roles/queries/get-paged-roles.query';

@Module({
  controllers: [RoleController],
  providers: [CreateRoleHandler, GetRolesHandler],
  exports: [], // <-- así lo puedes usar en AuthModule
})
export class RolesModule {}
