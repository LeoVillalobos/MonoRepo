// request-context.service.ts
import { AsyncLocalStorage } from 'async_hooks';

export interface RequestContext {
  userId?: string;
  userName?: string;
}

const asyncLocalStorage = new AsyncLocalStorage<RequestContext>();

export class RequestContextService {
  static run(userId: string, userName: string, callback: () => void) {
    asyncLocalStorage.run({ userId, userName }, callback);
  }

  static getUserId(): string | undefined {
    return asyncLocalStorage.getStore()?.userId;
  }

  static getUserName(): string | undefined {
    // Implementa si tienes el nombre de usuario en el contexto
    return asyncLocalStorage.getStore()?.userName;
  }
}
