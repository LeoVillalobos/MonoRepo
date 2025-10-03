import { BeforeCreate, BeforeUpdate, Column, CreatedAt, DataType, DeletedAt, Model, UpdatedAt } from 'sequelize-typescript';


export abstract class AuditableModel<
  TModelAttributes extends object,
  TCreationAttributes extends object = TModelAttributes
> extends Model<TModelAttributes, TCreationAttributes> {

  @Column({ type: DataType.STRING(100), allowNull: true })
  declare au_terminal: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  declare au_usuario: string;

  @CreatedAt
  @Column({ type: DataType.DATE, field: 'created_at' })
  declare created_at?: Date;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE })
  declare updated_at: Date;

  @DeletedAt
  @Column({ field: 'deleted_at', type: DataType.DATE })
  declare deleted_at: Date;

   // 🔹 Hooks que se aplican a TODOS los modelos que hereden de AuditableModel
  @BeforeCreate
  static setAuditFieldsBeforeCreate(instance: AuditableModel<any>) {

    instance.setDataValue('au_terminal', "APP_SERVER");
    instance.setDataValue('au_usuario', instance.getDataValue('au_usuario') ?? 'SYSTEM');
    instance.setDataValue('updated_at', new Date());
    instance.setDataValue('created_at', new Date());
    instance.setDataValue('deleted_at', null);

  }

  @BeforeUpdate
  static setAuditFieldsBeforeUpdate(instance: AuditableModel<any>) {
    instance.setDataValue('au_usuario', "SYSTEM");
    instance.setDataValue('updated_at', new Date());
  }

}
