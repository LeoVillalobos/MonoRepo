// src/app.module.ts
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ApplicationModule } from './modules/application.module';
import { ConfigModule } from '@nestjs/config';
import { RequestContextMiddleware } from './common/middleware/request-context.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // <-- lo hace disponible en toda la app
    }),
    ApplicationModule,

  ],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
