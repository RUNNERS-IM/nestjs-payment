// Nestjs
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

// Service
import { CryptoService } from './crypto.service';
import { ApiConfigService } from './api-config.service';

// Main section
describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoService, ApiConfigService, ConfigService],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  describe('encodeText', () => {
    it('should textOriginal and textDecoded must be the same', () => {
      const textOriginal = 'abc';
      const textEncoded = service.encode(textOriginal);
      const textDecoded = service.decode(textEncoded);
      expect(textDecoded).toBe(textOriginal);
    });
  });

  describe('encodeObject', () => {
    it('should textObject and textObject must be the same', () => {
      const objOriginal = { label: 'abc' };
      const objEncoded = service.encode(objOriginal);
      const objDecoded = service.decode(objEncoded);
      expect(objDecoded.label).toBe(objOriginal.label);
    });
  });
});
