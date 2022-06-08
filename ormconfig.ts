// Nestjs
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Third party
import dotenv from 'dotenv';

// Polyfill
import './src/boilerplate.polyfill';

// Strategy
import { SnakeNamingStrategy } from './src/snake-naming.strategy';

// Subscriber
import { AutoEncryptSubscriber } from 'typeorm-encrypted';

// Main section
dotenv.config({ path: `.envs/.${process.env.ENVIRONMENT}/.env` });

const configs: TypeOrmModuleOptions & { seeds: string[]; factories: string[] } = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  namingStrategy: new SnakeNamingStrategy(),
  subscribers: [AutoEncryptSubscriber],
  entities: ['src/modules/**/*.entity{.ts,.js}', 'src/modules/**/*.view-entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
};

module.exports = configs;
