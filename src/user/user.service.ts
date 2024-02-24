import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { CreateUserDto, SigninUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
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
      return this.signToken(user.id, user.email);
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

      return this.signToken(user.id, user.email);
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          createdBy: true,
          updatedBy: true,
          email: true,
          firstName: true,
          lastName: true,
          phoneNumber: true,
          clientId: true,
          roles: true,
        },
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
