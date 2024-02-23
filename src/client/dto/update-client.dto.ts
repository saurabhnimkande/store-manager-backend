import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EditClientDto {
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
  Address: string;
}
