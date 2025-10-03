import { Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { Role } from './role.model';
import { Permission } from './permission.model';
import { AuditableModel } from '../auditable.model';

@Table({ tableName: 'role_permissions', paranoid: false })
export class RolePermission extends AuditableModel<RolePermission> {
  @ForeignKey(() => Role)
  @Column({ type: DataType.UUID })
  role_id: string;

  @ForeignKey(() => Permission)
  @Column({ type: DataType.UUID })
  permission_id: string;
}
