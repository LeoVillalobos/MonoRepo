import { Table, Column, DataType } from 'sequelize-typescript';
import { AuditableModel } from '../base/auditable.model';

@Table({ tableName: 'roles', paranoid: true })
export class Role extends AuditableModel<Role> {
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
