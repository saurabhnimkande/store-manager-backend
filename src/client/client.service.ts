import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}
  async getClient(clientId: number) {
    const client = await this.prisma.client.findUnique({
      where: {
        id: clientId,
      },
    });
    return client;
  }

  async createClient(dto: CreateClientDto) {
    try {
      const client = await this.prisma.client.create({
        data: {
          ...dto,
        },
      });
      return client;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Client already exists');
        }
      } else {
        throw error;
      }
    }
  }

  async updateClient(clientId: number, dto) {
    const updatedClient = await this.prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        ...dto,
      },
    });

    return updatedClient;
  }

  async deleteClient(clientId: number) {
    const deletedClient = await this.prisma.client.delete({
      where: {
        id: clientId,
      },
    });
    return deletedClient;
  }

  async getAllClients() {
    const clients = await this.prisma.client.findMany();
    return clients;
  }
}
