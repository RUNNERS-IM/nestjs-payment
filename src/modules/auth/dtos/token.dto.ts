// Nestjs
import { ApiProperty } from '@nestjs/swagger';

// Main section
export class TokenDto {
  @ApiProperty()
  expiresIn: number;

  @ApiProperty()
  accessToken: string;

  constructor(data: { expiresIn: number; accessToken: string }) {
    this.expiresIn = data.expiresIn;
    this.accessToken = data.accessToken;
  }
}
