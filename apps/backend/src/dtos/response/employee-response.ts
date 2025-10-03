import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class EmployeeResponse {
  @ApiProperty({ description: 'Identificador único del empleado' })
  @Expose()
  id!: string;

  @ApiProperty({ description: 'Nombre del empleado' })
  @Expose()
  first_name!: string;

  @ApiProperty({ description: 'Apellido del empleado' })
  @Expose()
  last_name!: string;

  @ApiProperty({ description: 'Correo electrónico del empleado', required: false })
  @Expose()
  email?: string;

  @ApiProperty({ description: 'Número de teléfono del empleado', required: false })
  @Expose()
  phone?: string;

  @ApiProperty({ description: 'Puesto o cargo del empleado', required: false })
  @Expose()
  position?: string;

  @ApiProperty({ description: 'Departamento del empleado', required: false })
  @Expose()
  department?: string;

  @ApiProperty({ description: 'Fecha de creación del registro', required: false })
  @Expose()
  created_at?: Date;
}
