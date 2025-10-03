// src/app.module.ts
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ControllersModule } from './modules/controllers.module';
import { ApplicationModule } from './modules/application.module';
import { ConfigModule } from '@nestjs/config';
import { RequestContextMiddleware } from './common/middleware/request-context.middleware';

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true, // <-- lo hace disponible en toda la app
    }),
    ControllersModule, // 👈 Aquí están los controllers
    ApplicationModule,   // 👈 Aquí los services/handlers

  ],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
