## Controlador → crea instancia de GetEmployeesQuery con SieveModel.

```js
// src/controllers/employees.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateEmployeeCommand } from '../commands/employees/create-employee.command';
import { GetEmployeesQuery } from '../queries/employees/get-employees.query';
import { CreateEmployeeRequest } from 'src/dtos/request/create-employee.request';
import { EmployeeResponse } from 'src/dtos/response/employee-response';
import { PaginatedResponse } from 'src/dtos/response/base/paginated-response';
import { ApiQuery } from '@nestjs/swagger';
import { SieveModel } from 'src/models/sieve.model.class';
import { SieveQuery } from 'src/common/decorators/sieve-query.decorator';
import { BaseController } from './base/base.controller';
import { MediatorService } from 'src/common/services/mediator.service';

@Controller('employees')
export class EmployeesController extends BaseController {

   constructor(mediator: MediatorService) {
    super(mediator); // IMPORTANTE: pasar al constructor de la clase base
  }

  // Obtener todos los empleados
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiQuery({ name: 'search', required: false })
  async getAllEmployees(
    @SieveQuery() sieve: SieveModel,
  ): Promise<PaginatedResponse<EmployeeResponse>> {
    console.log('Received query parameters:', sieve);
    return this.mediator.sendQuery(new GetEmployeesQuery(sieve));
  }

  // Crear un empleado
  @Post()
  async createEmployee(@Body() data: CreateEmployeeRequest) {
    await this.mediator.sendCommand(new CreateEmployeeCommand(data));
  }
}


```

## QueryBus.execute → detecta el handler (@QueryHandler(GetEmployeesQuery)).

```js

import { GetPagedInfoQuery } from '../get-paged-info.query';
import { SieveModel } from 'src/models/sieve.model.class';

export class GetEmployeesQuery extends GetPagedInfoQuery {
  constructor(info: SieveModel) {
    super(info);
  }
}

```

```js

import { IQuery } from "@nestjs/cqrs";
import { SieveModel } from "src/models/sieve.model.class";


export class GetPagedInfoQuery implements IQuery {
  constructor(public readonly info: SieveModel) {}
}

```

## GetEmployeesHandler → extiende GetPagedInfoQueryHandler.

```js
import { QueryHandler } from '@nestjs/cqrs';
import { GetEmployeesQuery } from '../get-employees.query';
import { Employee } from 'src/models/employee.model';
import { EmployeeResponse } from 'src/dtos/response/employee-response';
import { GetPagedInfoQueryHandler } from 'src/common/cqrs/get-paged-info-query.handler';
import { GetPagedInfoQuery } from 'src/queries/get-paged-info.query';

@QueryHandler(GetEmployeesQuery)
export class GetEmployeesHandler extends GetPagedInfoQueryHandler<
  GetPagedInfoQuery,
  Employee,
  EmployeeResponse
> {

  protected allowedSortFields: Set<string> = new Set([
    'nombre',
    'apellido_paterno',
    'apellido_materno',
    'created_at',
    'estatus'
  ]);

  constructor() {
    super(EmployeeResponse); // <-- PASAMOS el DTO aquí
  }

  protected getEntity() {
    return Employee;
  }
}

```

## GetPagedInfoQueryHandler → ejecuta lógica de paginación, orden, filtros y mapea al DTO.

```js

import { PaginatedResponse } from 'src/dtos/response/base/paginated-response';
import { SieveModel } from 'src/models/sieve.model.class';
import { Model, ModelStatic, Op, Order, FindOptions } from 'sequelize';
import { plainToInstance } from 'class-transformer';

export abstract class GetPagedInfoQueryHandler<
  TQuery extends { info: SieveModel },
  TEntity extends Model,
  TResponse,
> {
  constructor(
    protected readonly responseCtor: new (entity: TEntity) => TResponse
  ) {}

  /** Columnas permitidas para ordenar */
  protected abstract allowedSortFields: Set<string>;

  /** Orden por defecto si no se especifica */
  protected defaultOrder: [string, 'ASC' | 'DESC'][] = [['created_at', 'ASC']];

  /** Devuelve la entidad Sequelize correspondiente */
  protected abstract getEntity(): ModelStatic<TEntity>;

  /**
   * Permite sobrescribir el query base antes de ejecutar la consulta.
   * Aquí puedes aplicar filtros específicos según el usuario, relaciones, scopes, etc.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
  protected async getQuery(_query: TQuery): Promise<FindOptions> {
    return {}; // Por defecto vacío, sobrescribir si se requiere
  }

  /**
   * Permite post-procesar los items antes de retornarlos.
   * Por ejemplo: agregar propiedades calculadas.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
  protected async postProcessItems(items: TResponse[], _query: TQuery): Promise<TResponse[]> {
    return items;
  }

  /** Ejecuta la query paginada */
  async execute(query: TQuery): Promise<PaginatedResponse<TResponse>> {
    const sieve = query.info;
    if (!sieve) throw new Error('SieveModel info is required');

    const limit = sieve.getLimit();
    const offset = sieve.getOffset();

    // Construye order validando columnas
    const sorts = sieve.getSortsParsed();
    let order: Order;
    if (sorts.length) {
      const orderItems: Array<[string, 'ASC' | 'DESC']> = [];
      for (const s of sorts) {
        const [field, dir] = s.trim().split(/\s+/);
        if (!this.allowedSortFields.has(field)) continue;
        orderItems.push([field, (dir ?? 'ASC').toUpperCase() as 'ASC' | 'DESC']);
      }
      order = orderItems.length ? (orderItems as Order) : this.defaultOrder as Order;
    } else {
      order = this.defaultOrder as Order;
    }

    const entity = this.getEntity();
    const baseQuery = await this.getQuery(query);

    // Agregar orden y paginación
    const findOptions: FindOptions = {
      ...baseQuery,
      limit,
      offset,
      order,
      raw: true,
    };

    // Cursor-based
    if (sieve.afterCursor) {
      findOptions.where = {
        ...(findOptions.where ?? {}),
        created_at: { [Op.gt]: new Date(sieve.afterCursor) },
      };
    }
    if (sieve.beforeCursor) {
      findOptions.where = {
        ...(findOptions.where ?? {}),
        created_at: { [Op.lt]: new Date(sieve.beforeCursor) },
      };
    }

    // Ejecuta la query
    const { rows, count } = await entity.findAndCountAll(findOptions);

    // Mapea a DTO
    let items = plainToInstance(this.responseCtor, rows, { excludeExtraneousValues: true });

    // Post-procesamiento
    items = await this.postProcessItems(items, query);

    const lastRow = rows[rows.length - 1] as unknown as { created_at: string };
    const nextCursor: string | null = lastRow ? lastRow.created_at : null;
    const hasNextPage = rows.length === limit;

    return new PaginatedResponse<TResponse>(
      sieve.getPage(),
      limit,
      count,
      items,
      nextCursor,
      hasNextPage
    );
  }
}

```

## Retorno → PaginatedResponse<EmployeeResponse> al controlador.

```js
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponse<T> {

  @ApiProperty()
  page!: number;

  @ApiProperty()
  limit!: number;

  @ApiProperty()
  total!: number;

  @ApiProperty({ isArray: true, type: () => Object }) // ⚡️ puedes sobrescribir en tus DTOs hijos
  items: T[];

  @ApiProperty()
  nextCursor: string | null;

  @ApiProperty()
  hasNextPage?: boolean;

  constructor(page: number, limit: number, total: number, items: T[], nextCursor: string | null, hasNextPage?: boolean) {
    this.page = page;
    this.limit = limit;
    this.total = total;
    this.items = items;
    this.nextCursor = nextCursor;
    this.hasNextPage = hasNextPage;
  }
}

```

```js
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class EmployeeResponse {
  @ApiProperty() @Expose() oid!: string;
  @ApiProperty() @Expose() nombre!: string;
  @ApiProperty() @Expose() apellido_paterno!: string;
  @ApiProperty({ required: false }) @Expose() apellido_materno?: string;
  @ApiProperty({ required: false }) @Expose() correo_electronico?: string;
  @ApiProperty({ required: false }) @Expose() numero_telefono?: string;
  @ApiProperty({ required: false }) @Expose() created_at?: Date;
}

```

```js
import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { SieveModel } from 'src/models/sieve.model.class';

export const SieveQuery = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<Request>();
  const q = (req.query ?? {}) as Record<string, unknown>;

  const pageRaw = q.page ?? q.p;
  const pageSizeRaw = q.pageSize ?? q.limit;
  const sortsRaw = q.sort ?? q.sorts;
  const filtersRaw = q.search ?? q.filters;

  const init: Partial<SieveModel> = {};

  if (pageRaw !== undefined) {
    const n = Number(pageRaw);
    if (Number.isFinite(n)) init.page = Math.max(1, Math.trunc(n));
  }
  if (pageSizeRaw !== undefined) {
    const n = Number(pageSizeRaw);
    if (Number.isFinite(n)) init.pageSize = Math.max(1, Math.trunc(n));
  }
  if (typeof sortsRaw === 'string') init.sorts = sortsRaw;
  if (typeof filtersRaw === 'string') init.filters = filtersRaw;

  const sieve = plainToInstance(SieveModel, init, { enableImplicitConversion: true });

  const errors = validateSync(sieve as object, { whitelist: true });
  if (errors.length) throw new BadRequestException(errors);

  return sieve;
});
```

```js
import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  PrimaryKey,
} from 'sequelize-typescript';

export interface EmployeeAttributes {
  oid?: string;
  estatus?: number;
  au_fecha_hora_mod?: Date;
  au_terminal?: string;
  au_usuario?: string;
  nombre?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  nombre_completo?: string;
  correo_electronico?: string;
  OptimisticLockField?: number;
  GCRecord?: number | null;
  numero_nomina?: string;
  estatusfecha?: Date;
  calle?: string;
  numero_exterior?: string;
  numero_interior?: string;
  colonia?: string;
  codigo_postal?: string;
  fecha_nacimiento?: Date;
  foto?: Buffer;
  identity_employee?: string;
  created_at?: Date;
  numero_telefono?: string;
}

export type EmployeeCreationAttributes = Omit<EmployeeAttributes, 'oid'>;

@Table({
  tableName: 'bb_ct_empleados',
  timestamps: false,
})
export class Employee extends Model<EmployeeAttributes, EmployeeAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID, field: 'oid' })
  oid!: string;

  @Column({ type: DataType.INTEGER, field: 'estatus' })
  estatus?: number;

  @Column({ type: DataType.DATE, field: 'au_fecha_hora_mod' })
  au_fecha_hora_mod?: Date;

  @Column({ type: DataType.STRING(30), field: 'au_terminal' })
  au_terminal?: string;

  @Column({ type: DataType.STRING(18), field: 'au_usuario' })
  au_usuario?: string;

  @Column({ type: DataType.STRING(80), field: 'nombre' })
  nombre?: string;

  @Column({ type: DataType.STRING(50), field: 'apellido_paterno' })
  apellido_paterno?: string;

  @Column({ type: DataType.STRING(50), field: 'apellido_materno' })
  apellido_materno?: string;

  @Column({ type: DataType.STRING(200), field: 'nombre_completo' })
  nombre_completo?: string;

  @Column({ type: DataType.STRING(60), field: 'correo_electronico' })
  correo_electronico?: string;

  @Column({ type: DataType.INTEGER, field: 'OptimisticLockField' })
  OptimisticLockField?: number;

  @Column({ type: DataType.INTEGER, field: 'GCRecord' })
  GCRecord?: number | null;

  @Column({ type: DataType.STRING(20), field: 'numero_nomina' })
  numero_nomina?: string;

  @Column({ type: DataType.DATE, field: 'estatusfecha' })
  estatusfecha?: Date;

  @Column({ type: DataType.STRING(80), field: 'calle' })
  calle?: string;

  @Column({ type: DataType.STRING(20), field: 'numero_exterior' })
  numero_exterior?: string;

  @Column({ type: DataType.STRING(20), field: 'numero_interior' })
  numero_interior?: string;

  @Column({ type: DataType.STRING(60), field: 'colonia' })
  colonia?: string;

  @Column({ type: DataType.STRING(5), field: 'codigo_postal' })
  codigo_postal?: string;

  @Column({ type: DataType.DATE, field: 'fecha_nacimiento' })
  fecha_nacimiento?: Date;

  @Column({ type: DataType.BLOB, field: 'foto' })
  foto?: Buffer;

  @Column({ type: DataType.UUID, field: 'identity_employee' })
  identity_employee?: string;

  @Default(DataType.NOW)
  @Column({ type: DataType.DATE, field: 'created_at' })
  created_at?: Date;

  @Column({ type: DataType.STRING(15), field: 'numero_telefono' })
  numero_telefono?: string;
}
```

```js
import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, IsString } from 'class-validator';

export class SieveModel {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number = 10;

  @IsOptional()
  @IsString()
  sorts?: string;

  @IsOptional()
  @IsString()
  filters?: string;

   // Nueva funcionalidad
  @IsOptional()
  @IsString()
  afterCursor?: string;  // ISO string o id del último registro

  @IsOptional()
  @IsString()
  beforeCursor?: string;

  constructor(init?: Partial<SieveModel>) {
    if (init) Object.assign(this, init);
    if (this.page === undefined) this.page = 1;
    if (this.pageSize === undefined) this.pageSize = 10;
  }

  getPage() {
    return this.page ?? 1;
  }
  getLimit() {
    return this.pageSize ?? 10;
  }
  getOffset() {
    return (this.getPage() - 1) * this.getLimit();
  }
  getSortsParsed() {
    return (this.sorts ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  getFiltersParsed() {
    return (this.filters ?? '')
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);
  }
}


```
