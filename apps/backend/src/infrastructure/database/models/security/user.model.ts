import { Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';

import { Role } from './role.model';
import { AuditableModel } from '../base/auditable.model';
import { Employee } from '../employee.model';

@Table({ tableName: 'users', paranoid: true })
export class User extends AuditableModel  <User> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({ type: DataType.STRING(50), allowNull: false, unique: true })
  declare username: string;

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  declare email: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare password: string;

  @ForeignKey(() => Role)
  @Column({ type: DataType.UUID, allowNull: true })
  declare role_id: string;

  @BelongsTo(() => Role, { as: 'role' })  // 👈 agrega la relación con alias
  declare role: Role;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.UUID, allowNull: false })
  declare employee_id: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare refreshToken?: string | null;
}
