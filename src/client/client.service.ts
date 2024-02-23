import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto, UpdateClientDto } from './dto';
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
    if (client) {
      return client;
    } else {
      throw new ForbiddenException('No client found');
    }
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

  async updateClient(clientId: number, dto: UpdateClientDto) {
    try {
      const updatedClient = await this.prisma.client.update({
        where: {
          id: clientId,
        },
        data: {
          ...dto,
        },
      });
      return updatedClient;
    } catch (error) {
      throw error;
    }
  }

  async deleteClient(clientId: number) {
    try {
      const client = await this.prisma.client.findUnique({
        where: {
          id: clientId,
        },
      });
      if (client) {
        const deletedClient = await this.prisma.client.delete({
          where: {
            id: clientId,
          },
        });
        return deletedClient;
      } else {
        throw new ForbiddenException('No client found');
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllClients() {
    try {
      const clients = await this.prisma.client.findMany();
      return clients;
    } catch (error) {
      throw error;
    }
  }
}
