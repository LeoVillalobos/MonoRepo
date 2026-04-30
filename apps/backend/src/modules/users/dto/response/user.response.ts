import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  employee_id: string;

  @ApiProperty({ required: false })
  role_id?: string;
}
