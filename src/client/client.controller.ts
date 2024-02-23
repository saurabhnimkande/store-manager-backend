import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateClientDto } from './dto';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get('')
  getClient() {}

  @Post('')
  createClient(@Body() dto: CreateClientDto) {
    return this.clientService.createClient(dto);
  }

  @Patch('update')
  updateClient() {}

  @Delete('delete')
  deleteClient() {}

  @Get('all')
  getAllClients() {}
}
