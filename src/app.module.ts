import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as path from 'path';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule, I18nJsonParser, HeaderResolver } from 'nestjs-i18n';
import { GlobalExceptionFilter } from './core/filters/global-exception-filter';
import { ValidationFilter } from './core/filters/validation-filter';
import { GlobalLoggingInterceptor } from './core/interceptors/global-logging-interceptor';
import { BooksModule } from './modules/books/books.module';
import { Book } from './modules/books/entities/book.entity';
import { Role } from './modules/members/entities/role.entity';
import { Member } from './modules/members/entities/member.entity';
import { ActiveBookReservation } from './modules/book-reservations/entities/active-book-reservation.entity';
import { BookReservationHistory } from './modules/book-reservations/entities/book-reservation-history.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(process.cwd(), 'src/i18n/'),
      },
      resolvers: [new HeaderResolver(['x-custom-lang'])],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      debug: true,
      playground: true,
      context: ({ req, connection }) =>
        connection ? { req: connection.context } : { req },
      formatError: (error) => {
        return {
          message: error?.message,
          code: error?.extensions?.['code'],
          exceptionInfo: error?.extensions?.['exceptionInfo'],
        };
      },
    }),
    // RedisModule.forRootAsync({
    //   useFactory: () => ({
    //     config: {
    //       url: process.env.REDIS_CONNECTION,
    //     },
    //   }),
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DB_CONNECTION,
      synchronize: false,
      entities: [
        Book,
        Role,
        Member,
        ActiveBookReservation,
        BookReservationHistory,
      ],
    }),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: GqlAuthGuard,
    // },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalLoggingInterceptor,
    },
  ],
})
export class AppModule {}
