// src/common/services/mediator.service.ts
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class MediatorService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /** Ejecuta un query */
  async sendQuery<T>(query: any): Promise<T> {
    try {
      return await this.queryBus.execute(query);
    } catch (err) {
      // Aquí puedes loggear errores, agregar trazabilidad, etc.
      console.error('Error en Query:', err);
      throw err;
    }
  }

  /** Ejecuta un comando */
  async sendCommand<T>(command: any): Promise<T> {
    try {
      return await this.commandBus.execute(command);
    } catch (err) {
      console.error('Error en Command:', err);
      throw err;
    }
  }
}
