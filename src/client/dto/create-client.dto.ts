import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  clientEmail: string;

  @IsString()
  @IsNotEmpty()
  clientPhoneNumber: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsNotEmpty()
  createdBy: string;

  @IsString()
  @IsOptional()
  updatedBy: string;
}
