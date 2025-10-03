import {
  Table,
  Column,
  DataType,
  Default,
  PrimaryKey
} from 'sequelize-typescript';
import { AuditableModel } from './auditable.model';

@Table({
  tableName: 'employees',
  timestamps: true,   // usa created_at y updated_at automáticamente
  paranoid: true,     // usa deleted_at para soft delete
})
export class Employee extends AuditableModel<Employee> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  declare first_name: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  declare last_name: string;

  @Column({ type: DataType.STRING(100), allowNull: true, unique: true })
  declare email: string;

  @Column({ type: DataType.STRING(20), allowNull: true })
  declare phone: string;

  @Column({ type: DataType.STRING(50), allowNull: true })
  declare position: string;

  @Column({ type: DataType.STRING(50), allowNull: true })
  declare department: string;

}
