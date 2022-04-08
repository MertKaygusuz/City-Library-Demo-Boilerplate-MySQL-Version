import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationExceptionBase,
  ValidationExceptions,
} from './core/filters/models/validation-exception';
import { RequestContextMiddleware } from './core/middlewares/request-context.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(RequestContextMiddleware);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const validationExceptions = new Array<ValidationExceptionBase>();

        for (const error of errors) {
          validationExceptions.push(
            new ValidationExceptionBase(
              error.constraints,
              error.property,
              error.value,
            ),
          );
        }

        return new ValidationExceptions(validationExceptions);
      },
    }),
  );
  await app.listen(3004);
}
bootstrap();
