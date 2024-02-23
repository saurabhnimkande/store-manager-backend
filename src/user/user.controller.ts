import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, SigninUserDto } from './dto';

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

  @Get('all-users')
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
