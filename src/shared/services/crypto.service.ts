// Nestjs
import { Injectable } from '@nestjs/common';

// Third party
// Service
import { ApiConfigService } from './api-config.service';
import { decryptData, encryptData } from 'typeorm-encrypted';
import { encryptionOptions } from '../../constants/encryption-options';

// Main section
@Injectable()
export class CryptoService {
  private cryptoPrivateKey: string;

  constructor(private apiConfigService: ApiConfigService) {
    const { cryptoPrivateKey } = this.apiConfigService.cryptoConfig;
    this.cryptoPrivateKey = cryptoPrivateKey;
  }

  encode(original: any): string {
    return encryptData(Buffer.from(JSON.stringify(original), 'utf8'), encryptionOptions).toString(
      'base64',
    );
    // return encryptData(Buffer.from(original, 'utf8'), encryptionOptions).toString('base64');
  }

  decode(cipher: string): any {
    const data = decryptData(Buffer.from(cipher, 'base64'), encryptionOptions).toString('utf8');
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
    // return decryptData(Buffer.from(cipher, 'base64'), encryptionOptions).toString('utf8');
  }
}
