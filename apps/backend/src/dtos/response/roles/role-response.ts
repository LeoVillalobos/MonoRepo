import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RoleResponse {
  @ApiProperty({ description: 'Identificador único del rol' })
  @Expose()
  id!: string;

  @ApiProperty({ description: 'Nombre del rol' })
  @Expose()
  name!: string;


  @ApiProperty({ description: 'Descripciónq del rol' })
  @Expose()
  description!: string;

}
