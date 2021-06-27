import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from 'src/dto/register.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    return this.userService.registerUser(registerDto);
  }
}
