import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEmployeeRequest {
  @ApiProperty({ description: 'Nombre del empleado' })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ description: 'Apellido del empleado' })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ description: 'Correo electrónico del empleado', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'Número de teléfono del empleado', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: 'Puesto o cargo del empleado', required: false })
  @IsString()
  @IsOptional()
  position?: string;

  @ApiProperty({ description: 'Departamento del empleado', required: false })
  @IsString()
  @IsOptional()
  department?: string;
}
