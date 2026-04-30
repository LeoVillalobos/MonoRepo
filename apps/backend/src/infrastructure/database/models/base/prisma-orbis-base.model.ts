// sieve.model.ts
export interface IFilterTerm {
  filter: string;
  names: string[];
  operator: string;
  operatorIsCaseInsensitive: boolean;
  operatorIsNegated: boolean;
  operatorParsed: FilterOperator;
  values: string[];
}

enum FilterOperator {
  Equals,
  NotEquals,
  GreaterThan,
  LessThan,
  GreaterThanOrEqualTo,
  LessThanOrEqualTo,
  Contains,
  StartsWith,
}

export interface ISortTerm {
  sort: string;
  descending: boolean;
  name: string;
}

export class PrismaOrbisModelBase<TFilter = any, TSort = any> {
  filters?: string;
  sorts?: string;
  page?: number;
  pageSize?: number;

  constructor(init?: Partial<PrismaOrbisModelBase<TFilter, TSort>>) {
    console.log('PrismaOrbisModelBase initialized with:', init);
    Object.assign(this, init);
  }

  // Devuelve la página actual, con valor por defecto 1
  getPage(): number {
    return this.page && this.page > 0 ? this.page : 1;
  }

  // Devuelve el límite por página, con valor por defecto 10
  getLimit(): number {
    console.log('Calculating limit with pageSize:', this.pageSize);
    return this.pageSize && this.pageSize > 0 ? this.pageSize : 10;
  }

  // Calcula el offset para SQL / Sequelize
  getOffset(): number {
    return (this.getPage() - 1) * this.getLimit();
  }

  // Devuelve los filtros parseados (solo como strings, puedes extender a objetos)
  getFiltersParsed(): string[] {
    if (!this.filters) return [];
    return this.filters
      .split(',')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);
  }

  // Devuelve los sorts parseados
  getSortsParsed(): string[] {
    if (!this.sorts) return [];
    return this.sorts
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }
}
