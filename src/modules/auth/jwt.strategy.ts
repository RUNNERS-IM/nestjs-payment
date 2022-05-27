import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { RoleType } from '../../constants';
import { TokenType } from '../../constants';
import { ApiConfigService } from '../../shared/services/api-config.service';
import type { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ApiConfigService, private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.authConfig.publicKey,
    });
  }

  async validate(args: { userId: Uuid; role: RoleType; type: TokenType }): Promise<UserEntity> {
    if (args.type !== TokenType.ACCESS_TOKEN) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOne({ id: args.userId });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
