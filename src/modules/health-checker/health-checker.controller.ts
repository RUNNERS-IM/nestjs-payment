import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { HealthCheckResult } from '@nestjs/terminus';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

import { ApiTag } from '../../constants/api-tag';
import { ServiceHealthIndicator } from './health-indicators/service.indicator';

@Controller('health')
@ApiTags(ApiTag.DEFAULT)
export class HealthCheckerController {
  constructor(
    private healthCheckService: HealthCheckService,
    private ormIndicator: TypeOrmHealthIndicator,
    private serviceIndicator: ServiceHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOkResponse()
  async check(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      () => this.ormIndicator.pingCheck('database', { timeout: 1500 }),
      () => this.serviceIndicator.isHealthy('search-service-health'),
    ]);
  }
}
