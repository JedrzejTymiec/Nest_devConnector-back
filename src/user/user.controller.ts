import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from 'src/user/dto/register.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Post()
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    return this.userService.registerUser(registerDto);
  }
}
