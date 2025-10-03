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
