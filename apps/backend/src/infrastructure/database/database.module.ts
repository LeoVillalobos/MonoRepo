// src/database/database.module.ts
import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Global()
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders], // 🔹 exporta para que otros módulos puedan usarlo
})

export class DatabaseModule {}
