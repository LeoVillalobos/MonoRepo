import { ICommandHandler } from '@nestjs/cqrs';
import { CreationAttributes, Model, ModelStatic } from 'sequelize';
import { plainToInstance } from 'class-transformer';
import { MediatorService } from 'src/common/services/mediator.service';
import { RequestContextService } from 'src/services/request-context.service';

export interface ICreateCommand<TRequest> {
  payload: TRequest;
}

export abstract class CreateCommandHandler<
  TRequest,
  TResponse,
  TEntity extends Model
> implements ICommandHandler<ICreateCommand<TRequest>, TResponse> {
  constructor(
    protected readonly mediator: MediatorService,
    protected readonly entityCtor: ModelStatic<TEntity>,
    protected readonly responseCtor: new (entity: TEntity) => TResponse,
  ) {}

  /** Validación antes de crear la entidad */
  protected async validate(payload: TRequest): Promise<void> {
    void payload; // esto indica a TS/ESLint que sí lo usamos
    await Promise.resolve(); // eslint ya no se queja
  }

  /** Lógica para modificar la entidad antes de guardar */
  protected async beforeCreate(entity: TEntity, payload: TRequest): Promise<void> {

    // Obtén el usuario desde el contexto
    const userName = RequestContextService.getUserName() ?? 'SYSTEM';

    // Inyecta el usuario en el campo au_usuario
    entity.setDataValue('au_usuario', userName);

    void payload;
    return Promise.resolve();
    // Override si se requiere lógica extra
  }

  /** Post-procesamiento después de guardar */
  protected async afterCreate(entity: TEntity, payload: TRequest): Promise<void> {
    // Override si se requiere lógica extra (ej. enviar email)
    void entity;
    void payload;
    return Promise.resolve();
  }

  protected async onMapping(payload: TRequest): Promise<TEntity> {
    const entity = this.entityCtor.build(payload as CreationAttributes<TEntity>);
    await Promise.resolve(entity);
    return entity;
  }

  async execute(command: ICreateCommand<TRequest>): Promise<TResponse> {
    const payload = command.payload;

    // Validación del payload
    await this.validate(payload);

     // Usa el hook onMapping
    const entity = await this.onMapping(payload);

    // Lógica antes de guardar
    await this.beforeCreate(entity, payload);

    // Guarda la entidad
    const savedEntity = await entity.save();

    // Lógica post-guardado
    await this.afterCreate(savedEntity, payload);

    // Convierte a DTO
    return plainToInstance(this.responseCtor, savedEntity, { excludeExtraneousValues: true });
  }
}
