import { Module } from '@nestjs/common';
import { CreateRoleHandler } from 'src/commands/roles/create-role.command';
import { GetRolesHandler } from 'src/queries/roles/get-paged-roles.query';

@Module({
  providers: [CreateRoleHandler, GetRolesHandler],
  exports: [], // <-- así lo puedes usar en AuthModule
})
export class RolesModule {}
