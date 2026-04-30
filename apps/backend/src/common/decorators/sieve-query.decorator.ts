// prisma-orbis.decorator.ts
import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { PrismaOrbisModel } from 'src/infrastructure/database/models/prisma-orbis.model';

export const PrismaOrbisQuery = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const q = (req.query ?? {}) as Record<string, unknown>;

    const pageRaw = q.page ?? q.p;
    const pageSizeRaw = q.pageSize ?? q.limit;
    const sortsRaw = q.sort ?? q.sorts;
    const filtersRaw = q.search ?? q.filters;
    const afterCursorRaw = q.afterCursor;
    const beforeCursorRaw = q.beforeCursor;

    const init: Partial<PrismaOrbisModel> = {};

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
    if (typeof afterCursorRaw === 'string') init.afterCursor = afterCursorRaw;
    if (typeof beforeCursorRaw === 'string') init.beforeCursor = beforeCursorRaw;

    const prismaOrbis = plainToInstance(PrismaOrbisModel, init, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(prismaOrbis as object, { whitelist: true });
    if (errors.length) throw new BadRequestException(errors);

    return prismaOrbis;
  },
);
