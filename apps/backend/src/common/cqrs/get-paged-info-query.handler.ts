import { PaginatedResponse } from 'src/dtos/response/base/paginated-response';
import { Model, ModelStatic, Op, Order, FindOptions } from 'sequelize';
import { plainToInstance } from 'class-transformer';
import { PrismaOrbisModel } from 'src/database/models/prisma-orbis.model';

export abstract class GetPagedInfoQueryHandler<
  TQuery extends { info: PrismaOrbisModel },
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
