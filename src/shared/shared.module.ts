// Nestjs
import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// Module
import { ConfigModule } from '@nestjs/config';

// Services
import { ApiConfigService } from './services/api-config.service';
import { AwsS3Service } from './services/aws-s3.service';
import { GeneratorService } from './services/generator.service';
import { TranslationService } from './services/translation.service';
import { ValidatorService } from './services/validator.service';
import { IamportService } from './services/iamport.service';
import { CryptoService } from './services/crypto.service';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import path from 'path';

// Main section
const providers = [
  ApiConfigService,
  ValidatorService,
  AwsS3Service,
  GeneratorService,
  TranslationService,
  IamportService,
  CryptoService,
  // {
  //   provide: 'NATS_SERVICE',
  //   useFactory: (configService: ApiConfigService) => {
  //     const natsConfig = configService.natsConfig;
  //     return ClientProxyFactory.create({
  //       transport: Transport.NATS,
  //       options: {
  //         name: 'NATS_SERVICE',
  //         url: `nats://${natsConfig.host}:${natsConfig.port}`,
  //       },
  //     });
  //   },
  //   inject: [ApiConfigService],
  // },
];

@Global()
@Module({
  providers,
  imports: [
    HttpModule,
    CqrsModule,
    ConfigModule,
    I18nModule.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        fallbackLanguage: configService.fallbackLanguage,
        parserOptions: {
          path: path.join(__dirname, '../i18n/'),
          watch: configService.isDevelopment,
        },
      }),
      parser: I18nJsonParser,
      inject: [ApiConfigService],
    }),
  ],
  exports: [...providers, HttpModule, CqrsModule],
})
export class SharedModule {}
