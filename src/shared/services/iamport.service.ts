import { Injectable } from '@nestjs/common';
import { ApiConfigService } from './api-config.service';

var Iamport = require('iamport');

@Injectable()
export class IamportService {
  public readonly iamport;
  public readonly certification;
  public readonly payment;
  public readonly subscribe;
  public readonly subscribe_customer;
  public readonly vbank;
  public readonly escrows;

  constructor(public configService: ApiConfigService) {
    const iamportConfig = configService.iamportConfig;
    this.iamport = new Iamport(iamportConfig);

    // Set
    this.certification = this.iamport.certification;
    this.payment = this.iamport.payment;
    this.subscribe = this.iamport.subscribe;
    this.subscribe_customer = this.iamport.subscribe_customer;
    this.vbank = this.iamport.vbank;
    this.escrows = this.iamport.escrows;
  }

  getCustomerUid(key: string) {
    return 'Customer-' + String(key) + '-' + String(new Date().getTime());
  }

  getMerchantUid(key: string) {
    return 'Merchant-' + String(key) + '-' + String(new Date().getTime());
  }
}
