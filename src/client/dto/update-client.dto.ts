import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  clientName: string;

  @IsOptional()
  @IsEmail()
  clientEmail: string;

  @IsString()
  @IsOptional()
  clientPhoneNumber: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  updatedBy: string;
}
