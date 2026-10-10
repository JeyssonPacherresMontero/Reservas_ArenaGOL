import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import { AllExceptionsFilter } from './common/interceptors/sentry.interceptor';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';

async function bootstrap() {
  try {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || 'development',
      tracesSampleRate: 1.0,
    });

    const app = await NestFactory.create(AppModule);

    app.use(helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" }
    }));

    const corsOrigins = process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean)
      : [
          'https://saastucancha.vercel.app',
          'https://tucancha.com.pe',
          'https://www.tucancha.com.pe',
          process.env.WEB_SERVICES_URL,
        ].filter(Boolean);

    app.enableCors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (
          /^https?:\/\/localhost(:\d+)?$/.test(origin) ||
          /^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(origin) ||
          origin.endsWith('.vercel.app') ||
          corsOrigins.includes(origin)
        ) {
          return callback(null, true);
        }
        return callback(new Error(`Not allowed by CORS: ${origin}`));
      },
      methods: 'GET,POST,PUT,DELETE,OPTIONS,PATCH',
      credentials: true,
    });

    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
    }));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    const port = Number(process.env.PORT) || 3001;
    await app.listen(port);
    console.log(`API listening on port ${port}`);
  } catch (error) {
    console.error('Failed to start API:', error);
    process.exit(1);
  }
}
bootstrap();
