// Nestjs
import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';

// Entity
import { UserEntity } from '../entities/user.entity';
import { TokenDto } from '../../auth/dtos/token.dto';

// Main section
export class UserTokenDto extends PickType(PartialType(UserEntity), [
  'id',
  'key',
  'name',
  'phone',
  'email',
  'address',
  'postcode',
] as const) {
  constructor(user: UserEntity, token: TokenDto) {
    super();
    this.id = user.id;
    this.key = user.key;
    this.name = user.name;
    this.phone = user.phone;
    this.email = user.email;
    this.address = user.address;
    this.postcode = user.postcode;
    this.expiresIn = token.expiresIn;
    this.accessToken = token.accessToken;
  }

  @ApiProperty({ default: 3600 })
  expiresIn: number;

  @ApiProperty({
    default:
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxZTA2ZDQ1Zi03YzUzLTQzNTYtODlhOC02ZWQ2OTBiNzM1YjciLCJ0eXBlIjoiQUNDRVNTX1RPS0VOIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE2NTM2NTA1MzJ9.Re1ElE6f5Hdw-YY5Gfto2Tj1jOGB5QkyitWrOyh6HH42X2htB8M8iyumpbYvnAbPHk1A0YwRZjrtMLaSvpZlkg',
  })
  accessToken: string;
}
