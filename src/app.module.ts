require('../env');

// Nestjs
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

// Adminjs
import { Database, Resource } from '@adminjs/typeorm';
import AdminJS from 'adminjs';

// Third party
import path from 'path';
import * as joi from 'joi';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';

// Polyfill
import './boilerplate.polyfill';

// Module
import { AuthModule } from './modules/auth/auth.module';
// import { adminjsModule } from './admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { HealthCheckerModule } from './modules/health-checker/health-checker.module';
import { SharedModule } from './shared/shared.module';
import { PaymentModule } from './modules/payment/payment.module';

// Filter
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

// Service
import { ApiConfigService } from './shared/services/api-config.service';

// Controller
import { AppController } from './app.controller';
import { adminjsModule } from './admin/admin.module';
import { CardModule } from './modules/card/card.module';

// Main section
AdminJS.registerAdapter({ Database, Resource });

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  ignoreEnvFile: process.env.NODE_ENV === 'production',
  envFilePath: `.envs/.${process.env.ENVIRONMENT}/.env`,
  validationSchema: joi.object({
    NODE_ENV: joi.string().valid('test', 'local', 'production').required(),

    // APP
    PORT: joi.string().required(),
    FALLBACK_LANGUAGE: joi.string().required(),
    ENABLE_ORM_LOGS: joi.boolean().required(),
    ENABLE_DOCUMENTATION: joi.boolean().required(),
    API_VERSION: joi.string().required(),

    // JWT Auth
    JWT_PRIVATE_KEY: joi.string().required(),
    JWT_PUBLIC_KEY: joi.string().required(),

    // DB
    DB_TYPE: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.string().required(),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_DATABASE: joi.string().required(),
  }),
});

@Module({
  imports: [
    configModule,
    adminjsModule,
    AuthModule,
    UserModule,
    PaymentModule,
    CardModule,
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) => configService.postgresConfig,
      inject: [ApiConfigService],
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        fallbackLanguage: configService.fallbackLanguage,
        parserOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: configService.isDevelopment,
        },
      }),
      imports: [SharedModule],
      parser: I18nJsonParser,
      inject: [ApiConfigService],
    }),
    HealthCheckerModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    ApiConfigService,
  ],
  controllers: [AppController],
})
export class AppModule {}
