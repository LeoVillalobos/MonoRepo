import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, IsString } from 'class-validator';

export class PrismaOrbisModel {
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

  constructor(init?: Partial<PrismaOrbisModel>) {
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
