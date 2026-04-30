import { Table, Column, DataType } from 'sequelize-typescript';
import { AuditableModel } from '../base/auditable.model';

@Table({ tableName: 'permissions', paranoid: true })
export class Permission extends AuditableModel<Permission> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({ type: DataType.STRING(50), allowNull: false, unique: true })
  declare name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string;
}
