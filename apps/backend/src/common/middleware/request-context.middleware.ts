import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestContextService } from 'src/common/context/request-context.service';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userId = req.user?.id ?? 'SYSTEM';
    const userName = req.user?.name ?? 'SYSTEM';

    RequestContextService.run(userId, userName, () => {
      next();
    });
  }
}
