import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, SigninUserDto } from './dto';
import { JwtGuard } from './guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('create')
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Post('signin')
  signinUser(@Body() dto: SigninUserDto) {
    return this.userService.signinUser(dto);
  }

  @UseGuards(JwtGuard)
  @Get('all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
