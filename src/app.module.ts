import './boilerplate.polyfill';

// import { Database, Resource } from '@adminjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
// import AdminJS from 'adminjs';
import * as joi from 'joi';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import path from 'path';

// import { adminjsModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { AuthModule } from './modules/auth/auth.module';
import { HealthCheckerModule } from './modules/health-checker/health-checker.module';
import { UserModule } from './modules/user/user.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

// AdminJS.registerAdapter({ Database, Resource });

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  ignoreEnvFile: process.env.NODE_ENV === 'production',
  envFilePath: `.envs/.${process.env.ENVIRONMENT}/.env`,
  validationSchema: joi.object({
    NODE_ENV: joi.string().valid('development', 'test', 'production').required(),

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
    AuthModule,
    UserModule,
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
    // adminjsModule,
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
