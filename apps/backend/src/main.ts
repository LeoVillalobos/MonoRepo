import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { RequestContextInterceptor } from './common/interceptor/request-context.interceptor';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new RequestContextInterceptor());

  app.setGlobalPrefix('api'); // 🔹 todo entrará por /api

  app.use(helmet());

  // Body parser
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));

  //  app.use(cookieParser()); // 🔹 esto permite que NestJS lea cookies

  // CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'https://mi-frontend.com'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Mi API')
    .setDescription('Documentación de mi API con Nest + Swagger')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }) // 🔹 agrega auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

   // Activa la validación automática
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades que no están en el DTO
      forbidNonWhitelisted: true, // lanza error si llega algo extra
      transform: true, // convierte JSON a instancia del DTO
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}


bootstrap();
