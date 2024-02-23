import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateClientDto, UpdateClientDto } from './dto';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get('all')
  getAllClients() {
    return this.clientService.getAllClients();
  }

  @Get(':id')
  getClient(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.getClient(id);
  }

  @Post('')
  createClient(@Body() dto: CreateClientDto) {
    return this.clientService.createClient(dto);
  }

  @Patch(':id')
  updateClient(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClientDto,
  ) {
    return this.clientService.updateClient(id, dto);
  }

  @Delete(':id')
  deleteClient(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.deleteClient(id);
  }
}
