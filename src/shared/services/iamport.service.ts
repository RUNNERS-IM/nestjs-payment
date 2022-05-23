import { Injectable } from '@nestjs/common';
import { ApiConfigService } from './api-config.service';

var Iamport = require('iamport');

@Injectable()
export class IamportService {
  public readonly iamport;

  constructor(public configService: ApiConfigService) {
    const iamportConfig = configService.iamportConfig;
    var iamport = new Iamport(iamportConfig);
    this.iamport = iamport;
  }
}
