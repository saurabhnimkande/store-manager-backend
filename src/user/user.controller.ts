import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('all-users')
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
