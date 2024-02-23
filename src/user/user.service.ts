import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { CreateUserDto, SigninUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(dto: CreateUserDto) {
    try {
      const hash = await argon.hash(dto.password);
      delete dto.password;
      const user = await this.prisma.user.create({
        data: {
          ...dto,
          hash,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('User already exists');
        }
      } else {
        throw error;
      }
    }
  }

  async signinUser(dto: SigninUserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (!user) {
        throw new ForbiddenException('Credentials incorrect');
      }
      const pwMatches = await argon.verify(user.hash, dto.password);

      if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

      return user;
    } catch (error) {
      throw error;
    }
  }
  async getAllUsers() {
    const users = await this.prisma.user.findMany({});
    return users;
  }
}
