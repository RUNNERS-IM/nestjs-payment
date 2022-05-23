// Nestjs
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Constant
import { RoleType, TokenType } from '../../constants';

// Service
import { ApiConfigService } from '../../shared/services/api-config.service';

// Dto
import { TokenDto } from './dtos/token.dto';

// Main section
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private configService: ApiConfigService) {}

  async createAccessToken(data: { role: RoleType; id: Uuid }): Promise<TokenDto> {
    return new TokenDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({
        userId: data.id,
        type: TokenType.ACCESS_TOKEN,
        role: data.role,
      }),
    });
  }
}
