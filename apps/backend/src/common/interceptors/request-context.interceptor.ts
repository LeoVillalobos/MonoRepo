// request-context.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestContextService } from 'src/common/context/request-context.service';

@Injectable()
export class RequestContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<{ user?: { userId: string; userName: string } }>();

    console.log("User from context in RequestContextInterceptor:", req.user);
    const userId = req.user?.userId ?? 'sistem';
    const userName = req.user?.userName ?? 'sistem';

    return new Observable((observer) => {
      RequestContextService.run(userId, userName, () => {
        next.handle().subscribe(observer);
      });
    });
  }
}
