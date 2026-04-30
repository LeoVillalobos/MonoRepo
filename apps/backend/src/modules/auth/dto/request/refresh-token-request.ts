import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenRequest {
  @ApiProperty({ description: 'Refresh token válido del usuario' })
  @IsString()
  refreshToken: string;
}
